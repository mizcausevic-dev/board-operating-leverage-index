$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Operating Leverage Index", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for operating leverage" -Subtitle "One executive brief for leverage strength, drag pressure, owner readiness, reinvestment confidence, and annual value." -Bullets @(
  "The overview keeps the strongest scale-ready lanes, escalation lanes, and unresolved drag pockets visible in one committee-safe surface.",
  "Leadership can see where leverage is already compounding and where drag or confidence gaps still weaken the board story.",
  "This layer turns scattered scorecards into one operating-leverage packet instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Leverage index keeps owner, audience, scale theme, and next move connected" -Subtitle "Every route retains the owner, audience, action, leverage theme, score, and scaling move." -Bullets @(
  "The leverage-index view makes it obvious which systems already have reusable scale signals and which ones still need work.",
  "Board questions stay attached to actual leverage themes instead of vague operating-efficiency language.",
  "Leadership can tighten the committee packet before the next board, investor, or operating review begins."
) -OutputPath (Join-Path $screenshots "02-leverage-index-proof.png")

New-ScenarioImage -Title "Drag pockets show where the board still cannot trust the scale story" -Subtitle "Drag pressure, owner readiness, reinvestment confidence, and required evidence stay visible in one decision readout." -Bullets @(
  "This view keeps FinTech, identity, and other weaker lanes tied to the drag pockets that still block a clean executive claim.",
  "Thin leverage remains visible before it turns into another overconfident memo or investor narrative.",
  "Leadership can see exactly where one tighter packet would strengthen the next board discussion."
) -OutputPath (Join-Path $screenshots "03-drag-pockets-proof.png")

New-ScenarioImage -Title "Scaling motions keep annual value tied to named leaders" -Subtitle "Annual leverage value, scale action, leverage score, and company-tag traces stay grounded in the same operating view." -Bullets @(
  "The scaling-motions view keeps reusable gains attached to actual owners instead of abstract leverage stories.",
  "Weak execution remains visible before the board assumes scaling value is already durable.",
  "This creates a repeatable packet that can travel into board, diligence, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-scaling-motions-proof.png")
