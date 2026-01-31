@echo off
echo Killing node processes...
taskkill /F /IM node.exe /T 2>nul
echo Clearing attributes...
attrib -r -h -s "d:\New Project website\Project Website\Ageinfo\Ageinfo\src\app\[locale]\born" /s /d
attrib -r -h -s "d:\New Project website\Project Website\Ageinfo\Ageinfo\src\app\[locale]\birthdate" /s /d
echo Deleting folders...
rd /s /q "d:\New Project website\Project Website\Ageinfo\Ageinfo\src\app\[locale]\born"
rd /s /q "d:\New Project website\Project Website\Ageinfo\Ageinfo\src\app\[locale]\birthdate"
echo Done.
