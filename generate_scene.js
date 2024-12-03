document.addEventListener('DOMContentLoaded', () => {
    fetch('treemap_data_full.json')
        .then(response => response.json())
        .then(cityData => {
            const scene = document.querySelector('#treemap-content');

            const LEVEL_COLORS = {
                "AB": "springgreen",
                "C1": "MediumPurple",
                "C2": "orangered"
            };

            const blockSpacing = 140;
            const blockWidth = 110;
            const blockDepth = 90;
            const buildingWidth = 10;
            const buildingDepth = 10;
            const buildingSpacing = 15;
            const buildingScale = 0.3;

            const platformHeight = 55;
            const startHeight = platformHeight + 1;

            const blockThickness = 3;

            let xOffset = -200;
            let zOffset = 0;

            let highlightedBuilding = null;

            document.addEventListener('click', (event) => {
                if (!event.target.classList.contains('interactive')) {
                    closeSidebar();
                    if (highlightedBuilding) {
                        highlightedBuilding.setAttribute('color', highlightedBuilding.originalColor);
                        highlightedBuilding = null;
                    }
                }
            });
      

            Object.entries(cityData.docs).forEach(([folderName, files]) => {
              
                const folderBlock = document.createElement('a-box');
                folderBlock.setAttribute('position', `${xOffset} ${startHeight} ${zOffset}`);
                folderBlock.setAttribute('width', blockWidth);
                folderBlock.setAttribute('depth', blockDepth);
                folderBlock.setAttribute('height', blockThickness);
                folderBlock.setAttribute('color', '#D3D3D3');
                folderBlock.setAttribute('material', 'roughness: 0.7; metalness: 0.3');
                scene.appendChild(folderBlock);
           // Add text in front of the folder block
const blockText = document.createElement('a-entity');
blockText.setAttribute('troika-text', `value: ${folderName}; fontSize: 2; color: #FFD700; depth: 0.2; font: https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxM.woff;`);

// Position the text in front of the block, some distance away
const textOffset = 15; // Distance in front of the block
blockText.setAttribute('position', `${xOffset} ${startHeight +5 + blockThickness / 2} ${zOffset - blockDepth / 2 - textOffset}`);

// Rotate the text to face the viewer
blockText.setAttribute('rotation', '0 180 0'); 

// Scale the text for better visibility
blockText.setAttribute('scale', '10 10 10');
scene.appendChild(blockText);




                const sortedFiles = Object.entries(files).sort(([fileA, dataA], [fileB, dataB]) => {
                    const heightA = Object.values(dataA.competency_groups).reduce((sum, val) => sum + val, 0);
                    const heightB = Object.values(dataB.competency_groups).reduce((sum, val) => sum + val, 0);
                    return heightA - heightB;
                });

                let buildingX = xOffset - blockWidth / 2 + buildingWidth / 2;
                let buildingZ = zOffset - blockDepth / 2 + buildingDepth / 2;

                sortedFiles.forEach(([fileName, fileData]) => {
                    let currentHeight = startHeight + blockThickness;

                    Object.entries(fileData.competency_groups).forEach(([level, value]) => {
                        if (value > 0) {
                            const floor = document.createElement('a-box');
                            const floorHeight = value * buildingScale;

                            floor.setAttribute('position', `${buildingX} ${currentHeight + floorHeight / 2} ${buildingZ}`);
                            floor.setAttribute('width', buildingWidth);
                            floor.setAttribute('depth', buildingDepth);
                            floor.setAttribute('height', floorHeight);
                            floor.setAttribute('color', LEVEL_COLORS[level]);
                            floor.setAttribute('class', 'interactive');

                            floor.addEventListener('mouseenter', () => {
                                if (!highlightedBuilding) floor.setAttribute('color', '#FFCC00');
                            });

                            floor.addEventListener('mouseleave', () => {
                                if (!highlightedBuilding) floor.setAttribute('color', LEVEL_COLORS[level]);
                            });

                            floor.addEventListener('click', (event) => {
                                event.stopPropagation();
                                if (highlightedBuilding) {
                                    highlightedBuilding.setAttribute('color', highlightedBuilding.originalColor);
                                }
                                highlightedBuilding = floor;
                                highlightedBuilding.originalColor = LEVEL_COLORS[level];
                                floor.setAttribute('color', '#FFCC00');
                                displayBuildingDetails(fileName);
                            });

                            scene.appendChild(floor);
                            currentHeight += floorHeight;
                        }
                    });

                    const fileLabel = document.createElement('a-text');
                    fileLabel.setAttribute('value', fileName);
                    fileLabel.setAttribute('position', `${buildingX} ${currentHeight + 2} ${buildingZ}`);
                    fileLabel.setAttribute('align', 'center');
                    fileLabel.setAttribute('color', 'black');
                    fileLabel.setAttribute('width', '30');
                    fileLabel.setAttribute('side', 'double');
                    fileLabel.setAttribute('rotation', '0 180 0');
                    fileLabel.setAttribute('class', 'filename-label');
                    scene.appendChild(fileLabel);

                    buildingX += buildingSpacing;
                    if (buildingX > xOffset + blockWidth / 2 - buildingWidth / 2) {
                        buildingX = xOffset - blockWidth / 2 + buildingWidth / 2;
                        buildingZ += buildingSpacing;
                    }
                });

                xOffset += blockSpacing;
                if (xOffset > 200) {
                    xOffset = -200;
                    zOffset += blockSpacing;
                }
            });
        });

    function displayBuildingDetails(fileName) {
        fetch('building_data.json')
            .then(response => response.json())
            .then(buildingData => {
                const buildingInfo = buildingData.find(item => item.file === fileName);

                if (buildingInfo) {
                    const sidebar = document.getElementById('sidebar');
                    sidebar.innerHTML = `
                        <button id="close-sidebar">X</button>
                        <h3>File: ${buildingInfo.file}</h3>
                        <p>Folder: ${buildingInfo.folder}</p>
                        <ul>
                            <li>AB: ${buildingInfo.competency_groups.AB}</li>
                            <li>C1: ${buildingInfo.competency_groups.C1}</li>
                            <li>C2: ${buildingInfo.competency_groups.C2}</li>
                        </ul>
                    `;
                    sidebar.style.display = 'block';

                    document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
                }
            });
    }

    function closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.display = 'none';
    }
});
