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
    const { title, description, shortDescription, technologies, category, liveUrl, githubUrl, featured, order, status } = req.body;

    const projectData = {
      title,
      description,
      shortDescription,
      technologies: technologies ? JSON.parse(technologies) : [],
      category,
      liveUrl,
      githubUrl,
      featured: featured === 'true' || featured === true,
      order: parseInt(order) || 0,
      status: status || 'completed',
      images: []
    };

    // Handle multiple images upload to Cloudinary
    if (req.files && req.files.length > 0) {
      try {
        for (const file of req.files) {
          const imageResult = await uploadToCloudinary(file.buffer, 'portfolio/projects');
          projectData.images.push({
            url: imageResult.url,
            publicId: imageResult.publicId
          });
        }
        
        // Set first image as thumbnail
        if (projectData.images.length > 0) {
          projectData.thumbnailImage = projectData.images[0];
        }
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed:', cloudinaryError.message);
      }
    }

    const project = await Project.create(projectData);
    return sendSuccess(res, 'Project created successfully', project, 201);
  } catch (error) {
    console.error('Error creating project:', error);
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

    const { title, description, shortDescription, technologies, category, liveUrl, githubUrl, featured, order, status } = req.body;

    // Update text fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (shortDescription !== undefined) project.shortDescription = shortDescription;
    if (technologies) project.technologies = JSON.parse(technologies);
    if (category) project.category = category;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (featured !== undefined) project.featured = featured === 'true' || featured === true;
    if (order !== undefined) project.order = parseInt(order);
    if (status) project.status = status;

    // Update images if new ones are uploaded
    if (req.files && req.files.length > 0) {
      try {
        // Delete old images from Cloudinary
        if (project.images && project.images.length > 0) {
          for (const img of project.images) {
            if (img.publicId) {
              try {
                await deleteFromCloudinary(img.publicId);
              } catch (err) {
                console.error('Failed to delete image from Cloudinary:', img.publicId);
              }
            }
          }
        }

        // Upload new images
        project.images = [];
        for (const file of req.files) {
          const imageResult = await uploadToCloudinary(file.buffer, 'portfolio/projects');
          project.images.push({
            url: imageResult.url,
            publicId: imageResult.publicId
          });
        }

        // Update thumbnail
        if (project.images.length > 0) {
          project.thumbnailImage = project.images[0];
        }
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed:', cloudinaryError.message);
      }
    }

    await project.save();
    return sendSuccess(res, 'Project updated successfully', project);
  } catch (error) {
    console.error('Error updating project:', error);
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

    // Delete all images from Cloudinary
    if (project.images && project.images.length > 0) {
      for (const img of project.images) {
        if (img.publicId) {
          try {
            await deleteFromCloudinary(img.publicId);
          } catch (err) {
            console.error('Failed to delete image from Cloudinary:', img.publicId);
          }
        }
      }
    }

    await project.deleteOne();
    return sendSuccess(res, 'Project deleted successfully');
  } catch (error) {
    console.error('Error deleting project:', error);
    next(error);
  }
};
