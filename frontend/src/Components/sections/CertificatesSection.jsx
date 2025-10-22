import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useCertificates } from "@/hooks/usePortfolio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FiAward,
  FiExternalLink,
  FiCalendar,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Loader from "@/Components/common/Loader";

// slider (exports named Slider + track/range/thumb)
import { Slider, SliderTrack, SliderRange, SliderThumb } from "../ui/slider";

const CertificatesSection = () => {
  const { isDarkMode } = useTheme();
  const { certificates, loading, error, refetch } = useCertificates();

  // Pagination + slider state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // default items per page

  // controlMode: 'slider' | 'pagination' - single control area toggles between these
  const [controlMode, setControlMode] = useState("slider");

  const [selectedCert, setSelectedCert] = useState(null);
  const [imageError, setImageError] = useState({});

  // Recompute total pages whenever certificates or pageSize changes
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil((certificates?.length || 0) / pageSize));
  }, [certificates, pageSize]);

  // Ensure current page is valid when data or pageSize changes
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  // Sliced data for current page
  const paginatedCertificates = useMemo(() => {
    if (!Array.isArray(certificates)) return [];
    const start = (page - 1) * pageSize;
    return certificates.slice(start, start + pageSize);
  }, [certificates, page, pageSize]);

  const handleImageError = (certKey) => {
    setImageError((prev) => ({ ...prev, [certKey]: true }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader variant="spinner" text="Loading certificates..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-2">⚠️ {error}</p>
        <p className={`text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>Could not load certificates</p>
      </div>
    );
  }

  return (
    <section id="certificates" className={`min-h-screen py-20 ${isDarkMode ? "bg-neutral-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <FiAward className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text">Certifications</span>
            </h2>
          </div>
          <p className={`text-md ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>Professional certifications and achievements</p>
        </motion.div>

        {/* Controls: Mode toggle + active control (either Slider or Page-jump) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 w-full md:w-1/2">
            {/* Active control area */}
            <div className="flex-1">
              {controlMode === "slider" ? (
                <div className="min-w-[140px]">
                  <p className={`text-sm mb-1 ${isDarkMode ? "text-neutral-300" : "text-neutral-600"}`}>Items per page</p>
                </div>
              ) : (
                <div>
                  <p className={`text-sm mb-1 ${isDarkMode ? "text-neutral-300" : "text-neutral-600"}`}>Go to page</p>
                  <div className="flex items-center gap-2">
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setPageSize(v);
                        setPage(1);
                      }}
                      className={`ml-3 px-2 py-1 rounded border ${isDarkMode ? "bg-neutral-900 border-neutral-800 text-white" : "bg-white border-neutral-200 text-neutral-900"}`}
                      aria-label="Items per page"
                    >
                      <option value={3}>3 / page</option>
                      <option value={6}>6 / page</option>
                      <option value={9}>9 / page</option>
                      <option value={12}>12 / page</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right-side pagination controls (First / Prev / page list / Next / Last) */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setPage(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page === 1}
            >
              First
            </Button>
            <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <FiChevronLeft />
            </Button>

            <div className="hidden md:flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    size={page === pageNum ? "default" : "sm"}
                    className={`${page === pageNum ? "bg-primary-600 text-white" : "bg-transparent"} `}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <FiChevronRight />
            </Button>
            <Button
              onClick={() => {
                setPage(totalPages);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page === totalPages}
            >
              Last
            </Button>
          </div>
        </div>

        {/* Certificates Grid (paginated) */}
        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>No certificates yet.</p>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCertificates.map((cert, idx) => {
              const certKey = cert._id || cert.id || `cert-${(page - 1) * pageSize + idx}`;

              return (
                <motion.div key={certKey} variants={cardVariants}>
                  <Card
                    className={`group h-full flex flex-col ${isDarkMode ? "bg-neutral-800 border-neutral-700 hover:border-primary-500" : "bg-white border-neutral-200 hover:border-primary-500"} transition-all duration-300 hover:shadow-xl cursor-pointer`}
                    onClick={() => setSelectedCert(cert)}
                  >
                    <div className="relative overflow-hidden rounded-t-lg aspect-video bg-neutral-100 dark:bg-neutral-900">
                      {!imageError[certKey] && (cert.image?.url || cert.image) ? (
                        <img
                          src={cert.image?.url ?? cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={() => handleImageError(certKey)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiAward className="w-16 h-16 text-primary-500/30" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span className="text-white font-medium">View Certificate</span>
                          <FiExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {cert.verified && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <FiCheckCircle className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className={`text-lg ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{cert.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <div className="space-y-3">
                        <p className={`text-sm font-medium ${isDarkMode ? "text-primary-400" : "text-primary-600"}`}>{cert.issuer}</p>

                        {cert.date && (
                          <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                            <FiCalendar className="w-4 h-4" />
                            <span>{cert.date}</span>
                          </div>
                        )}

                        {cert.credentialId && <p className={`text-xs ${isDarkMode ? "text-neutral-500" : "text-neutral-500"}`}>ID: {cert.credentialId}</p>}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {cert.skills?.slice(0, 3).map((skill, skillIdx) => (
                          <Badge key={skillIdx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {cert.skills?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{cert.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>

      {/* Certificate Detail Dialog */}
      <AnimatePresence>
        {selectedCert && (
          <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
            <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isDarkMode ? "bg-neutral-900 border border-neutral-800 text-white" : "bg-white border border-neutral-200 text-neutral-900"}`}>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCert.title}</DialogTitle>
                <DialogDescription className="text-primary-500">{selectedCert.issuer}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {!imageError[selectedCert._id || selectedCert.id] && (selectedCert.image?.url || selectedCert.image) && (
                  <div className="w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
                    <img src={selectedCert.image?.url ?? selectedCert.image} alt={selectedCert.title} className="w-full h-auto" onError={() => handleImageError(selectedCert._id || selectedCert.id)} />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {selectedCert.date && (
                    <div>
                      <h4 className={`text-sm font-medium mb-1 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>Issue Date</h4>
                      <p className={isDarkMode ? "text-white" : "text-neutral-900"}>{selectedCert.date}</p>
                    </div>
                  )}

                  {selectedCert.credentialId && (
                    <div>
                      <h4 className={`text-sm font-medium mb-1 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>Credential ID</h4>
                      <p className={`font-mono text-sm ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{selectedCert.credentialId}</p>
                    </div>
                  )}
                </div>

                {selectedCert.skills && selectedCert.skills.length > 0 && (
                  <div>
                    <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>Skills Covered</h4>
                    <div className="flex flex-wrap gap-2">{selectedCert.skills.map((skill, idx) => <Badge key={idx} variant="secondary">{skill}</Badge>)}</div>
                  </div>
                )}

                {selectedCert.description && (
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>About this Certificate</h4>
                    <p className={isDarkMode ? "text-neutral-300" : "text-neutral-700"}>{selectedCert.description}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {selectedCert.credentialUrl && (
                    <Button asChild className="flex-1">
                      <a href={selectedCert.credentialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <FiExternalLink className="w-4 h-4" />
                        View Credential
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedCert(null)} className="flex-1">Close</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
