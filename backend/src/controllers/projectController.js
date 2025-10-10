import Project from '../models/Project.js';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/responseHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadHelper.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, featured, status } = req.query;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const projects = await Project.find(filter)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Project.countDocuments(filter);

    return sendPaginatedResponse(res, projects, parseInt(page), parseInt(limit), total);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, 'Project retrieved successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res, next) => {
  try {
    const { title, description, technologies, category, demoUrl, githubUrl, featured, order, status } = req.body;

    // Check if image is uploaded
    if (!req.file) {
      return sendError(res, 'Project image is required', 400);
    }

    // Upload image to Cloudinary
    const imageResult = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');

    const project = await Project.create({
      title,
      description,
      technologies: technologies ? JSON.parse(technologies) : [],
      category,
      image: {
        url: imageResult.url,
        publicId: imageResult.publicId
      },
      demoUrl,
      githubUrl,
      featured: featured === 'true',
      order: parseInt(order) || 0,
      status
    });

    return sendSuccess(res, 'Project created successfully', project, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    const { title, description, technologies, category, demoUrl, githubUrl, featured, order, status } = req.body;

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (technologies) project.technologies = JSON.parse(technologies);
    if (category) project.category = category;
    if (demoUrl !== undefined) project.demoUrl = demoUrl;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (featured !== undefined) project.featured = featured === 'true';
    if (order !== undefined) project.order = parseInt(order);
    if (status) project.status = status;

    // Update image if new one is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (project.image.publicId) {
        await deleteFromCloudinary(project.image.publicId);
      }

      // Upload new image
      const imageResult = await uploadToCloudinary(req.file.buffer, 'portfolio/projects');
      project.image = {
        url: imageResult.url,
        publicId: imageResult.publicId
      };
    }

    await project.save();

    return sendSuccess(res, 'Project updated successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    // Delete image from Cloudinary
    if (project.image.publicId) {
      await deleteFromCloudinary(project.image.publicId);
    }

    await project.deleteOne();

    return sendSuccess(res, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};
