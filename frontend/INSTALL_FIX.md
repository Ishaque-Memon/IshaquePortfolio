# Quick Fix for npm install Error

## Problem
`EPERM: operation not permitted` error aa raha hai kyunki:
1. VS Code ne `package.json` lock kar rakhi hai
2. Ya koi antivirus software file ko block kar raha hai

## ✅ Solutions (Try in Order):

### Option 1: VS Code ko Close karke Install karein
```powershell
# 1. VS Code completely close karein (sab windows)
# 2. PowerShell ko Administrator mode mein open karein
# 3. Project folder mein jaein:
cd D:\Projects\IshaquePortfolio

# 4. Install karein:
npm install react-router-dom axios
```

### Option 2: Manual package.json Update (Recommended - Easiest)
Agar VS Code mein ho to yeh directly add kar sakte hain:

1. Open `package.json`
2. `dependencies` section mein add karein:
```json
"dependencies": {
  "@emailjs/browser": "^4.4.1",
  "@react-three/drei": "^9.120.6",
  "@react-three/fiber": "^8.17.12",
  "axios": "^1.6.0",
  "emailjs-com": "^3.2.0",
  "framer-motion": "^11.16.1",
  "gsap": "^3.13.0",
  "lucide-react": "^0.487.0",
  "rainyday.js": "^0.1.7",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-icons": "^5.5.0",
  "react-router-dom": "^6.20.0",
  "react-scroll": "^1.9.0",
  "react-tsparticles": "^2.12.2",
  "styled-components": "^6.1.14",
  "three": "^0.172.0"
}
```

3. Terminal mein run karein:
```powershell
npm install
```

### Option 3: Force Install with --force
```powershell
npm install react-router-dom axios --force
```

### Option 4: Delete node_modules and Reinstall
```powershell
# Delete node_modules
Remove-Item -Recurse -Force node_modules

# Delete package-lock.json
Remove-Item -Force package-lock.json

# Fresh install
npm install
```

### Option 5: Use Yarn (Alternative)
```powershell
# Install yarn if not installed
npm install -g yarn

# Install with yarn
yarn add react-router-dom axios
```

## 🎯 Recommended: Option 2 (Manual Edit)
Sabse aasan hai - direct `package.json` edit karo aur `npm install` run karo.

## ⚠️ Important Notes:
- Antivirus temporarily disable kar sakte hain
- Git Bash ya Command Prompt bhi try kar sakte hain
- Windows Defender Real-time protection se bhi issue ho sakta hai

## 🔍 Verify Installation:
Install hone ke baad check karein:
```powershell
npm list react-router-dom axios
```

Chahiye:
- react-router-dom@6.x.x
- axios@1.x.x
