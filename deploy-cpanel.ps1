# Script de Despliegue para cPanel
# Ejecutar: .\deploy-cpanel.ps1

Write-Host "🚀 Iniciando proceso de build..." -ForegroundColor Cyan

# Limpiar build anterior
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Carpeta dist anterior eliminada" -ForegroundColor Green
}

# Ejecutar build
Write-Host "📦 Compilando proyecto..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completado exitosamente" -ForegroundColor Green
    
    # Comprimir para subir
    if (Test-Path "deploy-cpanel.zip") {
        Remove-Item -Force "deploy-cpanel.zip"
    }
    
    Write-Host "📦 Comprimiendo archivos..." -ForegroundColor Cyan
    Compress-Archive -Path "dist\*" -DestinationPath "deploy-cpanel.zip" -Force
    
    # Copiar .htaccess a dist para incluirlo en el zip
    Copy-Item ".htaccess" -Destination "dist\.htaccess"
    
    Write-Host ""
    Write-Host "✅ ¡Listo para desplegar!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "1. Ve a cPanel File Manager" -ForegroundColor White
    Write-Host "2. Navega a public_html" -ForegroundColor White
    Write-Host "3. Sube el archivo: deploy-cpanel.zip" -ForegroundColor White
    Write-Host "4. Extrae el archivo ZIP" -ForegroundColor White
    Write-Host "5. Elimina el archivo ZIP" -ForegroundColor White
    Write-Host ""
    Write-Host "📁 Archivo generado: deploy-cpanel.zip" -ForegroundColor Cyan
    Write-Host "📊 Tamaño: $((Get-Item deploy-cpanel.zip).Length / 1KB) KB" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}
