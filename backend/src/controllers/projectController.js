import Project from '../models/Project.js';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/responseHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadHelper.js';
import { normalizeProjectImages } from '../utils/cloudinaryUrl.js';
import { emitSocketEvent } from '../utils/socketEmitter.js';

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

    // Normalize image URLs
    const normalized = projects.map((p) => normalizeProjectImages(p));

    return sendPaginatedResponse(res, normalized, parseInt(page), parseInt(limit), total);
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

    return sendSuccess(res, 'Project retrieved successfully', normalizeProjectImages(project));
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
    }

    const project = await Project.create(projectData);

    // Emit socket event
    emitSocketEvent('projectCreated', project);

    return sendSuccess(res, 'Project created successfully', normalizeProjectImages(project), 201);
  } catch (error) {
  // ...removed console.error('Error creating project:', error);
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

    const { title, description, shortDescription, technologies, category, liveUrl, githubUrl, featured, order, status, imagesToDelete } = req.body;

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

    // Handle image deletions
    let currentImages = project.images || [];
    if (imagesToDelete) {
      const publicIdsToDelete = JSON.parse(imagesToDelete);
      for (const publicId of publicIdsToDelete) {
        const imageIndex = currentImages.findIndex(img => img.publicId === publicId);
        if (imageIndex !== -1) {
          try {
            await deleteFromCloudinary(publicId);
            currentImages.splice(imageIndex, 1);
          } catch (err) {
            // ...removed console.error(`Failed to delete image ${publicId} from Cloudinary:`, err);
          }
        }
      }
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageResult = await uploadToCloudinary(file.buffer, 'portfolio/projects');
        currentImages.push({
          url: imageResult.url,
          publicId: imageResult.publicId
        });
      }
    }
    project.images = currentImages;

    // Update thumbnail image: if there are images, set the first one as thumbnail. Otherwise, clear it.
    if (project.images.length > 0) {
      project.thumbnailImage = project.images[0];
    } else {
      project.thumbnailImage = { url: '', publicId: '' };
    }

    await project.save();

    // Emit socket event
    emitSocketEvent('projectUpdated', project);

    return sendSuccess(res, 'Project updated successfully', normalizeProjectImages(project));
  } catch (error) {
  // ...removed console.error('Error updating project:', error);
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
            // ...removed console.error('Failed to delete image from Cloudinary:', img.publicId);
          }
        }
      }
    }

    await project.deleteOne();

    // Emit socket event
    emitSocketEvent('projectDeleted', { id: req.params.id });

    return sendSuccess(res, 'Project deleted successfully');
  } catch (error) {
  // ...removed console.error('Error deleting project:', error);
    next(error);
  }
};
