import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, Compass, HardDrive, Cpu, Radio, Shield, Globe, Play, RefreshCw, X } from 'lucide-react';

interface SyncedFile {
  name: string;
  size: string;
  type: string;
  coords: string;
  status: 'synced' | 'processing' | 'error';
  telemetry: string;
}

export default function JournalUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatusText, setSyncStatusText] = useState('');
  const [activeTelemetryLine, setActiveTelemetryLine] = useState('');
  const [files, setFiles] = useState<SyncedFile[]>([
    {
      name: "KADAMBRAYAR_MANGROVE_ROUTE.gpx",
      size: "24.8 KB",
      type: "GPX Track",
      coords: "9.9816° N, 76.2999° E",
      status: "synced",
      telemetry: "24 waypoints, 12.4 km distance, +1m alt change"
    },
    {
      name: "KADAMAKKUDY_SUNSET_LOG.jpg",
      size: "4.2 MB",
      type: "Metadata Photo",
      coords: "10.0245° N, 76.2428° E",
      status: "synced",
      telemetry: "Focal Length 35mm, ISO 100, Alt 1m, Water temp 28.5°C"
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (fileName: string, fileSizeStr: string, isPhoto = false) => {
    setIsProcessing(true);
    setSyncProgress(0);
    setSyncStatusText("ESTABLISHING SATELLITE CONNECTION...");
    setActiveTelemetryLine("PINGING BEACON ID: H-C-KADAMBRAYAR");

    // Phase 1: Satellite Connection (0% - 30%)
    setTimeout(() => {
      setSyncProgress(30);
      setSyncStatusText("DOWNLOADING GNSS COORDINATES...");
      setActiveTelemetryLine("GPS-X9 ARRAY CONNECTED. EXTRACTING ALTIMETRY...");
    }, 1000);

    // Phase 2: Metadata Extraction (30% - 70%)
    setTimeout(() => {
      setSyncProgress(65);
      setSyncStatusText(isPhoto ? "DECRYPTING PHOTO CAMERA METADATA..." : "PARSING GPX WAYPOINTS & VELOCITY...");
      setActiveTelemetryLine(isPhoto 
        ? "APERTURE f/2.8 | SHUTTER 1/250 | COCONUT PALMS DETECTED: 98.6% ACCURACY" 
        : "WAYPOINT #14 DECRYPTED. KADAMBRAYAR CHANNEL REACHED."
      );
    }, 2200);

    // Phase 3: Final Sync (70% - 100%)
    setTimeout(() => {
      setSyncProgress(100);
      setSyncStatusText("DISPATCH LOG SECURELY SYNCED");
      setActiveTelemetryLine("BACKWATER MAP DATABASE SYNCHRONIZED SUCCESSFULLY.");

      const newFile: SyncedFile = {
        name: fileName,
        size: fileSizeStr,
        type: isPhoto ? "Metadata Photo" : "GPX Track",
        coords: isPhoto ? "10.0123° N, 76.2514° E" : "9.9867° N, 76.3112° E",
        status: "synced",
        telemetry: isPhoto 
          ? "ISO 100, F/4.0, Exposure 1/500s, Backwater reflection verified" 
          : "32 waypoints, 18.2 km distance, Active tidal flow detected"
      };

      setFiles(prev => [newFile, ...prev]);
    }, 3800);

    // Finish Processing
    setTimeout(() => {
      setIsProcessing(false);
      setSyncProgress(0);
    }, 4800);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;
      const isPhoto = file.type.startsWith('image/');
      processFile(file.name, sizeStr, isPhoto);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(1)} KB`;
      const isPhoto = file.type.startsWith('image/');
      processFile(file.name, sizeStr, isPhoto);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const deleteFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const loadMockFile = (type: 'gpx' | 'photo') => {
    if (isProcessing) return;
    if (type === 'gpx') {
      processFile("VEMBANAD_LAKE_DRIFT.gpx", "14.2 KB", false);
    } else {
      processFile("MANGROVE_TUNNEL_SUNLIGHT.jpg", "3.8 MB", true);
    }
  };

  return (
    <section id="dispatch-upload" className="relative py-24 bg-gradient-to-b from-[#040e0f] to-abyss-black overflow-hidden">
      
      {/* Aurora glow effect */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-glacier-cyan/5 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-glacier-blue/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] text-glacier-cyan uppercase mb-3 glow-text-cyan">
            INTERACTIVE EXPEDITION PORTAL
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-wider leading-none mb-6">
            The Dispatch Center
          </h2>
          <p className="text-xs font-mono tracking-widest text-glacier-gray uppercase">
            Upload your expedition logs, photos, or GPX tracks to compile your official travel journal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: Upload Dropzone & Processing HUD */}
          <div className="lg:col-span-7 space-y-6 w-full">
            
            {/* Upload Zone */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`relative cursor-pointer rounded-3xl p-10 text-center transition-all duration-500 overflow-hidden ${
                dragActive
                  ? 'border-2 border-glacier-cyan bg-glacier-cyan/10 shadow-[0_0_30px_rgba(0,245,255,0.15)]'
                  : 'border border-glacier-cyan/20 bg-abyss-black/40 hover:border-glacier-cyan/40 hover:bg-glacier-cyan/5'
              }`}
            >
              {/* Rotating Background Ring Glow */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -inset-[10px] bg-gradient-to-r from-glacier-cyan via-transparent to-glacier-blue blur-[80px] animate-aurora" />
              </div>

              {/* Decorative Tech Corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-glacier-cyan/40" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-glacier-cyan/40" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-glacier-cyan/40" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-glacier-cyan/40" />

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".gpx,.kml,.gdb,.jpg,.jpeg,.png,.md"
                onChange={handleFileInput}
                disabled={isProcessing}
              />

              <div className="flex flex-col items-center justify-center space-y-6 relative z-10 py-6">
                <div className="relative group">
                  <div className="absolute -inset-2 rounded-full bg-glacier-cyan/20 blur-md group-hover:scale-120 transition-all duration-300 opacity-60" />
                  <div className="relative p-5 rounded-full border border-glacier-cyan/30 bg-abyss-black text-glacier-cyan group-hover:border-glacier-cyan/60 transition-colors duration-300">
                    <Upload size={32} className={dragActive ? "animate-bounce" : ""} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">
                    {dragActive ? "DROP JOURNAL DISPATCH" : "DRAG & DROP EXPEDITION FILES"}
                  </h3>
                  <p className="text-xs font-mono tracking-widest text-glacier-gray uppercase max-w-sm mx-auto leading-relaxed">
                    SUPPORTS GPX TRACKS, JPG IMAGES, OR MARKDOWN NOTES. CLICK TO BROWSE.
                  </p>
                </div>

                <div className="flex items-center space-x-6 text-[9px] font-mono tracking-widest text-glacier-gray/60 uppercase">
                  <span>MAX SIZE: 15MB</span>
                  <span>•</span>
                  <span>SECURE TELEMETRY DECRYPTION</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Processing Telemetry HUD */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-3xl p-6 liquid-glass border border-glacier-cyan/35 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Radio size={16} className="text-glacier-cyan animate-pulse" />
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white font-bold">
                        ACTIVE METADATA PARSER
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-glacier-cyan font-bold tracking-widest">
                      {syncProgress}% SYNCED
                    </span>
                  </div>

                  {/* Glacier Progress Bar */}
                  <div className="relative h-2 w-full rounded-full bg-abyss-black/60 overflow-hidden border border-glacier-cyan/15">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${syncProgress}%` }}
                      transition={{ ease: "easeInOut" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-glacier-cyan to-glacier-blue glow-border-cyan rounded-full"
                    />
                  </div>

                  {/* Telemetry output logs */}
                  <div className="p-4 rounded-xl bg-abyss-black/80 border border-glacier-cyan/10 font-mono text-[9px] tracking-wider text-left space-y-2 text-glacier-gray">
                    <div className="flex items-center gap-2">
                      <Cpu size={12} className="text-glacier-cyan animate-spin-slow" />
                      <span className="text-white uppercase font-bold">{syncStatusText}</span>
                    </div>
                    <div className="text-glacier-cyan opacity-80 pl-5 uppercase font-medium">
                      {activeTelemetryLine}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Demo Preloads */}
            <div className="flex items-center justify-between p-5 rounded-2xl border border-glacier-cyan/10 bg-abyss-black/30">
              <span className="text-[10px] font-mono tracking-widest text-glacier-gray uppercase">
                NO GPX FILE? PRELOAD SAMPLE TELEMETRY:
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => loadMockFile('gpx')}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 rounded-lg border border-glacier-cyan/25 hover:border-glacier-cyan/50 text-[9px] font-mono tracking-widest text-white uppercase bg-glacier-cyan/5 hover:bg-glacier-cyan/15 disabled:opacity-50 transition-colors"
                >
                  + Sample GPX
                </button>
                <button
                  onClick={() => loadMockFile('photo')}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 rounded-lg border border-glacier-cyan/25 hover:border-glacier-cyan/50 text-[9px] font-mono tracking-widest text-white uppercase bg-glacier-cyan/5 hover:bg-glacier-cyan/15 disabled:opacity-50 transition-colors"
                >
                  + Sample Photo
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Synced Dispatches HUD list */}
          <div className="lg:col-span-5 space-y-6 w-full text-left">
            <div className="rounded-3xl p-6 md:p-8 bg-abyss-black/50 border border-glacier-cyan/15 h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-glacier-cyan/10 mb-6">
                  <div className="flex items-center space-x-2">
                    <Compass size={18} className="text-glacier-cyan animate-pulse" />
                    <span className="text-xs font-mono tracking-[0.25em] text-white uppercase font-bold">
                      ACTIVE EXPEDITION LOGS
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-glacier-cyan/15 border border-glacier-cyan/30 text-[8px] font-mono tracking-widest text-glacier-cyan uppercase">
                    {files.length} SYNCED
                  </span>
                </div>

                {/* Synced files list */}
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                  <AnimatePresence initial={false}>
                    {files.map((file, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="p-4 rounded-2xl bg-abyss-black/80 border border-glacier-cyan/10 hover:border-glacier-cyan/30 flex flex-col space-y-3 relative group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-glacier-cyan/5 text-glacier-cyan border border-glacier-cyan/10">
                              <FileText size={16} />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white tracking-wide truncate max-w-[180px] uppercase">
                                {file.name}
                              </h4>
                              <p className="text-[9px] font-mono text-glacier-gray tracking-wider uppercase">
                                {file.type} • {file.size}
                              </p>
                            </div>
                          </div>

                          <button 
                            onClick={() => deleteFile(idx)}
                            className="text-glacier-gray/40 hover:text-red-400 p-1 rounded transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>

                        {/* Telemetry data info badge */}
                        <div className="p-2.5 rounded-lg bg-glacier-cyan/5 border border-glacier-cyan/5 space-y-1 font-mono text-[8px] tracking-wider text-glacier-gray uppercase">
                          <div className="flex justify-between">
                            <span>Synced Position</span>
                            <span className="text-glacier-cyan font-bold">{file.coords}</span>
                          </div>
                          <div className="text-[8px] text-glacier-gray/70 pt-1 leading-normal border-t border-glacier-cyan/5 truncate">
                            {file.telemetry}
                          </div>
                        </div>

                        {/* Top-right subtle sync badge */}
                        <div className="absolute top-2 right-10 flex items-center space-x-1 bg-glacier-cyan/5 px-2 py-0.5 rounded border border-glacier-cyan/10">
                          <CheckCircle2 size={10} className="text-glacier-cyan" />
                          <span className="text-[7px] font-mono tracking-widest text-glacier-cyan uppercase">
                            VERIFIED
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {files.length === 0 && (
                    <div className="text-center py-12 space-y-3">
                      <AlertCircle className="text-glacier-gray/45 mx-auto" size={32} />
                      <p className="text-xs font-mono tracking-wider text-glacier-gray/60 uppercase">
                        NO ACTIVE EXPEDITION DISPATCHES FOUND.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sat-Sync Panel CTA footer */}
              <div className="mt-8 border-t border-glacier-cyan/10 pt-6">
                <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-glacier-cyan to-glacier-blue text-abyss-black font-bold font-mono text-[10px] tracking-[0.25em] uppercase hover:brightness-110 shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all flex items-center justify-center gap-2 group">
                  <Globe size={12} className="animate-spin-slow" />
                  Synchronize Dispatch Log
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
