<#
Script para instalar dependências usando imagem Node no Docker.
Execute a partir da raiz do projeto (pasta do script) no PowerShell.
#>
$ErrorActionPreference = 'Stop'

try {
    $projectPath = (Get-Location).ProviderPath
    Write-Host "Caminho do projeto: $projectPath"

    Write-Host 'Executando: docker run --rm -v "<hostPath>:/app" -w /app node:18 npm install'
    docker run --rm -v "$projectPath:/app" -w /app node:18 npm install

    Write-Host 'Instalação concluída.' -ForegroundColor Green
}
catch {
    Write-Host 'Erro ao executar docker run ou npm install:' -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host 'Verifique se o Docker Desktop está em execução e se a unidade está compartilhada.'
    exit 1
}
