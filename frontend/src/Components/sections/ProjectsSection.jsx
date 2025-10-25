import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useProjects } from "@/hooks/usePortfolio";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FiGithub, FiExternalLink, FiPlay } from "react-icons/fi";
import Loader from "@/Components/common/Loader";

const ProjectsSection = () => {
  const { isDarkMode } = useTheme();
  const { projects, loading, error } = useProjects(); // use shared hook

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = Array.isArray(projects) ? projects.map((p) => p.category).filter(Boolean) : [];
    return ["all", ...Array.from(new Set(cats))];
  }, [projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    return selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="projects"
      className={`min-h-screen py-20 ${isDarkMode ? "bg-neutral-950" : "bg-neutral-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className={`text-lg ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
            Showcasing my best work and achievements
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader variant="spinner" text="Loading Projects..." />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 mb-2">⚠️ {error}</p>
            <p className={`text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>Using static data as fallback</p>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
            {/* Tabs (categories) */}
            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="max-w-md mx-auto grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="capitalize">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Main Project Carousel */}
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {filteredProjects.map((project) => {
                  const key = project._id || project.id || project.title;
                  const imgUrl = project.images?.[0]?.url ?? project.image ?? null;

                  return (
                    <CarouselItem key={key} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <motion.div variants={itemVariants} layout exit={{ opacity: 0, scale: 0.9 }}>
                        <Card
                          className={`h-full flex flex-col ${
                            isDarkMode ? "bg-neutral-900 border-neutral-800 hover:border-neutral-700" : "bg-white border-neutral-200 hover:border-neutral-300"
                          } transition-all duration-300 hover:shadow-xl group cursor-pointer`}
                          onClick={() => setSelectedProject(project)}
                        >
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = `https://placehold.co/400x300/334155/fff?text=${encodeURIComponent(project.title)}`;
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                                <span className="text-neutral-500">{project.title}</span>
                              </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                <Button size="sm" className="flex-1">
                                  <FiPlay className="mr-2" /> View Details
                                </Button>
                              </div>
                            </div>
                          </div>

                          <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{project.title}</CardTitle>
                              <Badge variant="secondary" className="shrink-0">{project.category}</Badge>
                            </div>
                            <CardDescription className={isDarkMode ? "text-neutral-400" : "text-neutral-600"}>
                              {project.shortDescription || project.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="flex-1">
                            <div className="flex flex-wrap gap-2">
                              {(project.technologies ?? []).slice(0, 4).map((tech, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                              ))}
                              {(project.technologies ?? []).length > 4 && (
                                <Badge variant="outline" className="text-xs">+{project.technologies.length - 4}</Badge>
                              )}
                            </div>
                          </CardContent>

                          <CardFooter className="flex gap-2">
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" className="flex-1" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <FiGithub className="mr-2" /> GitHub
                                </a>
                              </Button>
                            )}
                            {project.liveUrl && (
                              <Button size="sm" className="flex-1" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <FiExternalLink className="mr-2" /> Live Demo
                                </a>
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Project Details Modal */}
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
              <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isDarkMode ? "bg-neutral-900 border border-neutral-800 text-white" : "bg-white border border-neutral-200 text-neutral-900"}`}>
                {selectedProject && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                      <DialogDescription>{selectedProject.category}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {selectedProject.images && selectedProject.images.length > 0 && (
                        <Carousel className="w-full max-w-xs mx-auto md:max-w-md lg:max-w-lg">
                          <CarouselContent>
                            {selectedProject.images.map((image, index) => (
                              <CarouselItem key={index}>
                                <div className="p-1">
                                  <Card>
                                    <CardContent className="flex aspect-video items-center justify-center p-6">
                                      <img
                                        src={image.url}
                                        alt={`${selectedProject.title} - Image ${index + 1}`}
                                        className="w-full h-full object-cover rounded-md"
                                      />
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      )}

                      {selectedProject.videoUrl && (
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <video controls className="w-full h-full" src={selectedProject.videoUrl}>
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}

                      <div>
                        <h4 className="text-lg font-semibold mb-2">About this project</h4>
                        <p className={isDarkMode ? "text-neutral-400" : "text-neutral-600"}>{selectedProject.longDescription || selectedProject.description}</p>
                      </div>

                      {selectedProject.features && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                          <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                            {selectedProject.features.map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {(selectedProject.technologies ?? []).map((t, i) => <Badge key={i} variant="secondary">{t}</Badge>)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedProject.duration && (<div><p className="text-sm text-neutral-500">Duration</p><p className="font-medium">{selectedProject.duration}</p></div>)}
                        {selectedProject.teamSize && (<div><p className="text-sm text-neutral-500">Team Size</p><p className="font-medium">{selectedProject.teamSize}</p></div>)}
                        {selectedProject.role && (<div><p className="text-sm text-neutral-500">Role</p><p className="font-medium">{selectedProject.role}</p></div>)}
                        {selectedProject.status && (<div><p className="text-sm text-neutral-500">Status</p><Badge>{selectedProject.status}</Badge></div>)}
                      </div>

                      <div className="flex gap-3">
                        {selectedProject.githubUrl && (
                          <Button variant="outline" asChild>
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                              <FiGithub className="mr-2" /> View on GitHub
                            </a>
                          </Button>
                        )}
                        {selectedProject.liveUrl && (
                          <Button asChild>
                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                              <FiExternalLink className="mr-2" /> Visit Live Site
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
