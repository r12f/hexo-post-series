param (
    [Parameter(Mandatory = $true, Position = 0)]
    [string] $Version
)

function Update-BuildRevisionVersion()
{
    $buildConfigFolder = $PSScriptRoot

    $packageJsonFilePath = "$buildConfigFolder\..\package.json"
    Write-Host "package.json file path: $packageJsonFilePath"

    $newVersion = "$Version"
    $packageJsonFileContent = Get-Content $packageJsonFilePath -Raw
    $packageJsonFileContent = $packageJsonFileContent.Replace("`"1.0.0`"", "`"$Version`"")
    Write-Host "Updating version to: $newVersion"

    $encoding = New-Object System.Text.UTF8Encoding $False
    [System.IO.File]::WriteAllLines($packageJsonFilePath, $packageJsonFileContent, $encoding)
}

Update-BuildRevisionVersion