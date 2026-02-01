# Lance un serveur HTTP pour ce dossier et affiche l'URL à ouvrir depuis le mobile
# Usage: Ouvrir PowerShell ici et lancer: .\start-server.ps1

# Trouve une adresse IPv4 non-loopback
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.PrefixOrigin -ne 'WellKnown' } | Select-Object -First 1 -ExpandProperty IPAddress) -join ''
if (-not $ip) {
  Write-Host "Impossible de détecter l'adresse IP locale. Vérifiez votre connexion réseau." -ForegroundColor Yellow
} else {
  Write-Host "Ouvrez sur mobile (même réseau) :" -ForegroundColor Green
  Write-Host "https?://$ip:8000/" -ForegroundColor Cyan
  Write-Host "ou pour le chemin de projet: http://$ip:8000/project-boussole/" -ForegroundColor Cyan
}

Write-Host "Démarrage du serveur (Ctrl+C pour arrêter)..." -ForegroundColor Green
python -m http.server 8000 --directory $PSScriptRoot
