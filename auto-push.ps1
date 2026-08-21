$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repo

Write-Host "Auto Push aktif..."
Write-Host "Menunggu perubahan file..."

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repo
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    Start-Sleep -Milliseconds 1000

    Set-Location $repo

    $status = git status --porcelain

    if ($status) {
        Write-Host ""
        Write-Host "Perubahan terdeteksi!"

        git add .
        git commit -m "Auto update website"
        git push

        Write-Host ""
        Write-Host "Website berhasil dikirim ke GitHub!"
        Write-Host ""
    }
}

Register-ObjectEvent $watcher Changed -Action $action
Register-ObjectEvent $watcher Created -Action $action
Register-ObjectEvent $watcher Deleted -Action $action
Register-ObjectEvent $watcher Renamed -Action $action

while ($true) {
    Start-Sleep -Seconds 1
}