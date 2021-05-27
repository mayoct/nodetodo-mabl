/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
const fs = require('fs');

// Create
app.get('/c', (req, res) => {
    var item = req.query.item;
    var body = create_impl(item);
    res.send(body);
});

// Read
app.get('/', (_req, res) => {
    var body = read_impl();
    res.send(body);
});

// Update
app.get('/u', (_req, _res) => {
    // not implemented
});

// Delete
app.get('/d', (req, res) => {
    var delno = req.query.delno;
    var body = delete_impl(delno);
    res.send(body);
});

// css
app.get('/css/style.css', (req, res) => {
    fs.readFile("./css/style.css", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(data);
        res.end();
    });
});

function create_impl(item) {
    var items = load_items();
    items.push(item);
    save_items(items);
    return read_impl();
}

function read_impl() {
    var items = load_items();
    var body = "<html><head><link rel='stylesheet' href='css/style.css'></head>";
    body += "<body><h1>NodeToDo</h1><div id='items'>";
    body += "<table><thead><tr><th>Done</th><th>Item</th></tr></thead>";
    body += "<tbody>";
    var no = 0;
    for (var item of items) {
        no++;
        body += "<tr>";
        body += `<td><a href="/d?delno=${no}">\u2713</a></td><td>${item}</td>`;
        body += "</tr>";
    }
    if (no == 0) {
        body += "<tr><td colspan='2'>All done!</td></tr>";
    }
    body += "<tr><td colspan='2'><form action='/c'>New item: ";
    body += "<input type='text' name='item'> ";
    body += "<input type='submit' value='Add'>";
    body += "</form></td></tr>";
    body += "</tbody></table></div></body></html>";

    return body;
}

function update_impl() {
    // not implemented
}

function delete_impl(delno) {
    var items = load_items();
    var newItems = [];
    var no = 1;
    for (var item of items) {
        if (no != delno) {
            newItems.push(item);
        }
        no++;
    }
    save_items(newItems);
    return read_impl();
}

function load_items() {
    var text;
    var items = [];

    if (fs.existsSync('todos.txt')) {
        text = fs.readFileSync('todos.txt', 'utf-8');

    } else {
        text = "lint\nunit test\ne2e test\n";
    }
    
    if (text.length > 0) {
        items = text.slice(0, -1).split(/\n/);        
    }

    return items;
}

function save_items(items) {
    var text = "";
    for (var item of items) {
        text = text + item + '\n';
    }
    fs.writeFileSync('todos.txt', text, 'utf-8');
}

function input_tag(type, name, value) {
    var s = `<input type="${type}" name="${name}" value="${value}">`
    return s;
}

// Server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
module.exports = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);