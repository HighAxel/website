from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    # Load commands from the JSON file
    with open('commands.json', 'r') as file:
        commands_data = json.load(file)

    # Organize commands by category
    commands_by_category = {}
    for command in commands_data:
        category = command['category']
        if category not in commands_by_category:
            commands_by_category[category] = []
        commands_by_category[category].append(command)

    return render_template('index.html', commands=commands_by_category)

if __name__ == '__main__':
    app.run(debug=True)
