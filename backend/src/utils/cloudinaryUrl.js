import { cloudinary } from '../config/cloudinary.js';

const isAbsoluteUrl = (u) => typeof u === 'string' && /^https?:\/\//i.test(u);

export const buildCloudinaryUrl = (publicId) => {
  if (!publicId) return '';
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
  });
};

export const normalizeProjectImages = (project) => {
  if (!project) return project;
  const p = project.toObject ? project.toObject() : { ...project };

  if (Array.isArray(p.images)) {
    p.images = p.images.map((img) => {
      if (!img) return img;
      const url = isAbsoluteUrl(img.url) ? img.url : buildCloudinaryUrl(img.publicId);
      return { ...img, url };
    });
  }

  if (p.thumbnailImage) {
    const t = p.thumbnailImage;
    const url = isAbsoluteUrl(t.url) ? t.url : buildCloudinaryUrl(t.publicId);
    p.thumbnailImage = { ...t, url };
  }

  return p;
};
