import React, { useState } from "react";

const DownloadTool = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!inputUrl) {
      alert("Please enter a URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://ai-ai-9a7b.up.railway.app/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: inputUrl, format })
      });

      if (!response.ok) {
        throw new Error("Download failed.");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `media.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>AI Video/Audio Downloader</h2>

      <input
        type="text"
        placeholder="Enter YouTube/Instagram URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        style={styles.input}
      />

      <select value={format} onChange={(e) => setFormat(e.target.value)} style={styles.select}>
        <option value="mp4">MP4 (Video)</option>
        <option value="mp3">MP3 (Audio)</option>
      </select>

      <button onClick={handleDownload} style={styles.button} disabled={loading}>
        {loading ? "Downloading..." : "Download"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif"
  },
  title: {
    fontSize: "20px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }
};

export default DownloadTool;
