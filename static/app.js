// Fetch commands from the API and display them
fetch('/api/commands')
    .then(response => response.json())
    .then(data => {
        const categoryButtonsContainer = document.getElementById('category-buttons');
        const commandsContainer = document.getElementById('commands');

        // Create category buttons
        for (const category in data) {
            const categoryButton = document.createElement('button');
            categoryButton.className = 'category-button';
            categoryButton.textContent = `${category} (${data[category].length})`;
            categoryButton.addEventListener('click', () => {
                showCommands(category);
                setActiveButton(categoryButton);
            });
            categoryButtonsContainer.appendChild(categoryButton);
        }

        // Show commands of a selected category
        function showCommands(category) {
            commandsContainer.innerHTML = '';
            data[category].forEach(command => {
                const commandCard = document.createElement('div');
                commandCard.className = 'command-card';
                commandCard.innerHTML = `
                    <h2>${command.name}</h2>
                    <p class="command-description">${command.description || 'No description available.'}</p>
                    <p><strong>Usage:</strong> ${command.usage}</p>
                    <p><strong>Aliases:</strong> ${command.aliases.join(', ') || 'None'}</p>
                `;
                commandsContainer.appendChild(commandCard);
            });
        }

        // Set the active button style
        function setActiveButton(button) {
            const buttons = document.querySelectorAll('.category-button');
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        }

        // Default to show the first category's commands
        if (categoryButtonsContainer.children.length > 0) {
            categoryButtonsContainer.children[0].click();
        }
    })
    .catch(error => {
        console.error('Error fetching commands:', error);
    });
