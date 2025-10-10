# Git Permission Fix Script for Windows
# Run this once to permanently fix Git permission issues

Write-Host "🔧 Fixing Git Permissions..." -ForegroundColor Cyan

# Fix 1: Reset .git folder permissions
Write-Host "`n1️⃣ Resetting .git folder permissions..." -ForegroundColor Yellow
icacls .git /reset /T /Q
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Permissions reset successfully" -ForegroundColor Green
}

# Fix 2: Grant full permissions to current user
Write-Host "`n2️⃣ Granting full permissions to current user..." -ForegroundColor Yellow
icacls .git /grant:r "$env:USERNAME`:(OI)(CI)F" /T /Q
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Full permissions granted" -ForegroundColor Green
}

# Fix 3: Set Git global configurations
Write-Host "`n3️⃣ Configuring Git settings..." -ForegroundColor Yellow
git config --global core.filemode false
git config --global core.autocrlf true
git config --global core.longpaths true
git config --global core.safecrlf false
Write-Host "   ✅ Git configurations updated" -ForegroundColor Green

# Fix 4: Remove any lock files
Write-Host "`n4️⃣ Removing any lock files..." -ForegroundColor Yellow
if (Test-Path ".git\index.lock") {
    Remove-Item -Force ".git\index.lock"
    Write-Host "   ✅ Removed index.lock" -ForegroundColor Green
}
if (Test-Path ".git\COMMIT_EDITMSG.lock") {
    Remove-Item -Force ".git\COMMIT_EDITMSG.lock"
    Write-Host "   ✅ Removed COMMIT_EDITMSG.lock" -ForegroundColor Green
}

# Fix 5: Display current Git config
Write-Host "`n📋 Current Git Configuration:" -ForegroundColor Cyan
Write-Host "   core.filemode: $(git config --global core.filemode)" -ForegroundColor White
Write-Host "   core.autocrlf: $(git config --global core.autocrlf)" -ForegroundColor White
Write-Host "   core.longpaths: $(git config --global core.longpaths)" -ForegroundColor White
Write-Host "   core.safecrlf: $(git config --global core.safecrlf)" -ForegroundColor White

Write-Host "`n✅ Git permission fix complete!" -ForegroundColor Green
Write-Host "   You can now use Git commands without permission issues." -ForegroundColor White
Write-Host "`n🎯 Next steps:" -ForegroundColor Cyan
Write-Host "   git status" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor Yellow
Write-Host "   git commit -m 'Your message'" -ForegroundColor Yellow
Write-Host "   git push" -ForegroundColor Yellow
