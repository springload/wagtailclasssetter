function(modal) {
    modal.respond('classChosen', {{ response|safe }});
    modal.close();
}
