# 3D Visualization of Requests Library Code Proficiency

This project is an interactive 3D visualization that represents the proficiency levels required to work with Python code in various `.py` files of the Requests Library. Using A-Frame, the project creates a cityscape where:

- **Folders** are represented as blocks.
- **`.py` files** within each folder are represented as buildings.
- **Floors of the buildings** depict proficiency levels (e.g., AB, C1, C2), with height and color indicating their distribution.

## Features
- **Interactive 3D View**: Explore the proficiency levels as an intuitive cityscape.
- **Detailed Building Info**: Click on a building to see specific details about its associated `.py` file and the proficiency levels it requires.
- **Hovering Labels**: Each block and building is labeled for easy identification.
- **Dynamic Sidebar**: Provides additional information about selected buildings.

## How It Works
1. The **treemap_data_full.json** file contains hierarchical data about folders and files.
2. The **building_data.json** file contains proficiency details for each `.py` file.
3. The `generate_scene.js` script generates the 3D cityscape, dynamically creating blocks and buildings based on the provided JSON files.
4. Interactivity is handled via click events, highlighting buildings, and displaying details.

## Project Structure
- **index.html**: The main HTML file that initializes the A-Frame scene.
- **generate_scene.js**: The script that generates the 3D cityscape and handles interactivity.
- **building_data.json**: Contains data on the proficiency levels for each `.py` file.
- **treemap_data_full.json**: Contains the hierarchical structure of folders and `.py` files.
- **style.css**: Handles the styling of the sidebar and other elements.
- **script.js**: (Optional) Additional JavaScript functionalities.

## How to Run
1. Open the `index.html` file in a web browser or host the project on a platform like [Glitch](https://glitch.com) or a local web server.
2. Interact with the 3D scene:
   - Click on buildings to highlight them and display their details.
   - Use the keyboard or mouse to navigate the scene.
3. Explore proficiency levels and folder structures visually.

## Tools and Technologies
- **A-Frame**: A web framework for building 3D/VR experiences.
- **JavaScript**: For dynamic scene generation and interactivity.
- **HTML/CSS**: For structure and styling.
- **JSON**: For data storage and retrieval.

## Future Improvements
- Add a search feature to locate specific files or folders.
- Enhance visual aesthetics with more advanced textures and animations.
- Include support for additional Python libraries.

## License
This project is licensed under the [MIT License](LICENSE).

## Credits
- **Author**: [Your Name]
- **Library**: [Requests Library](https://docs.python-requests.org/)
- **Built With**: A-Frame, JavaScript, and HTML5.
