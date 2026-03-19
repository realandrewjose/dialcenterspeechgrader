#!/usr/bin/env python3
"""Simple local server for the Public Speaking Grader web build."""

import http.server
import socketserver
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
WEB_DIR = os.path.join(os.path.dirname(__file__), "web-build")


class SPAHandler(http.server.SimpleHTTPRequestHandler):
    """Serve static files; fall back to index.html for SPA routing."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def do_GET(self):
        # Check if the requested file exists in web-build
        path = os.path.join(WEB_DIR, self.path.lstrip("/"))
        if not os.path.exists(path) or os.path.isdir(path):
            # SPA fallback — serve index.html
            self.path = "/index.html"
        super().do_GET()

    def log_message(self, format, *args):
        # Suppress per-request logs; uncomment below to re-enable
        # print(f"  {self.address_string()} - {format % args}")
        pass


if not os.path.isdir(WEB_DIR):
    print(f"ERROR: '{WEB_DIR}' not found.")
    print("Run 'npm run build:web' first, then try again.")
    sys.exit(1)

with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
    print(f"""
╔════════════════════════════════════════════╗
║  Public Speaking Grader (Python Server)    ║
╠════════════════════════════════════════════╣
║  http://localhost:{PORT:<26}║
║  Press Ctrl+C to stop                      ║
╚════════════════════════════════════════════╝
""")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
