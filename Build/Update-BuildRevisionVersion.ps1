param (
    [Parameter(Mandatory = $true, Position = 0)]
    [string] $Version
)

function Update-BuildRevisionVersion()
{
    $buildConfigFolder = $PSScriptRoot

    $packageJsonFilePath = [System.IO.Path]::Combine($buildConfigFolder, "..", "package.json")
    Write-Host "package.json file path: $packageJsonFilePath"

    $newVersion = "$Version"
    Write-Host "Updating version to: $newVersion"
    $packageJsonFileContent = Get-Content $packageJsonFilePath -Raw
    $packageJsonFileContent = $packageJsonFileContent.Replace("`"1.0.0`"", "`"$Version`"")

    Write-Host "New package.json content:"
    Write-Host $packageJsonFileContent
    Write-Host ""

    Write-Host "Updating package.json: $packageJsonFilePath"
    $encoding = New-Object System.Text.UTF8Encoding $False
    [System.IO.File]::WriteAllLines($packageJsonFilePath, $packageJsonFileContent, $encoding)
}

Update-BuildRevisionVersion