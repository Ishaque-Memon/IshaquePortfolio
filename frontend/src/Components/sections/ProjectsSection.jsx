import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { projectsData } from "@/data/portfolioData";
import { useProjects } from "@/hooks/usePortfolio";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { FiGithub, FiExternalLink, FiPlay, FiX } from "react-icons/fi";

const ProjectsSection = () => {
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // API Integration
  const { projects: apiProjects, loading, error } = useProjects();
  const [projectsToDisplay, setProjectsToDisplay] = useState(projectsData);

  // Update projects when API data arrives
  useEffect(() => {
    if (apiProjects && apiProjects.length > 0) {
      setProjectsToDisplay(apiProjects);
    }
  }, [apiProjects]);

  // Get unique categories
  const categories = ["all", ...new Set(projectsToDisplay.map(p => p.category))];

  // Filter projects by category
  const filteredProjects = selectedCategory === "all" 
    ? projectsToDisplay 
    : projectsToDisplay.filter(p => p.category === selectedCategory);

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
      className={`min-h-screen py-20 ${
        isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
      }`}
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
          <p className={`text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Showcasing my best work and achievements
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className={`ml-4 text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Loading projects...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 mb-2">⚠️ {error}</p>
            <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Using static data as fallback
            </p>
          </div>
        )}

        {/* Projects Content */}
        {!loading && (
        <>
        {/* Category Tabs */}
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className={`grid w-full max-w-md mx-auto grid-cols-${Math.min(categories.length, 4)}`}>
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className={`h-full flex flex-col ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                } transition-all duration-300 hover:shadow-xl group`}>
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/400x300/334155/fff?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                          className="flex-1"
                        >
                          <FiPlay className="mr-2" /> View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className={`text-xl ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                        {project.title}
                      </CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        {project.category}
                      </Badge>
                    </div>
                    <CardDescription className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
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
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${
            isDarkMode 
              ? 'bg-neutral-900 border border-neutral-800 text-white' 
              : 'bg-white border border-neutral-200 text-neutral-900'
          }`}>
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                  <DialogDescription>{selectedProject.category}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Video Player (if available) */}
                  {selectedProject.videoUrl && (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <video 
                        controls 
                        className="w-full h-full"
                        src={selectedProject.videoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}

                  {/* Long Description */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">About this project</h4>
                    <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Features */}
                  {selectedProject.features && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                      <ul className={`list-disc list-inside space-y-1 ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {selectedProject.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProject.duration && (
                      <div>
                        <p className="text-sm text-neutral-500">Duration</p>
                        <p className="font-medium">{selectedProject.duration}</p>
                      </div>
                    )}
                    {selectedProject.teamSize && (
                      <div>
                        <p className="text-sm text-neutral-500">Team Size</p>
                        <p className="font-medium">{selectedProject.teamSize}</p>
                      </div>
                    )}
                    {selectedProject.role && (
                      <div>
                        <p className="text-sm text-neutral-500">Role</p>
                        <p className="font-medium">{selectedProject.role}</p>
                      </div>
                    )}
                    {selectedProject.status && (
                      <div>
                        <p className="text-sm text-neutral-500">Status</p>
                        <Badge>{selectedProject.status}</Badge>
                      </div>
                    )}
                  </div>

                  {/* Links */}
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
