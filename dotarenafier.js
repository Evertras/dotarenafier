var replaceText = function(node, regex, replacement, excludeElements) { 
    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'cavas']);

    var child = node.firstChild;

    if (child === null) {
        return node;
    }
            
    do {
        switch (child.nodeType) {
            case 1:
                if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
                    continue;
                }

                replaceText(child, regex, replacement, excludeElements);
                break;

            case 3:
                child.data = child.data.replace(regex, replacement);
                break;
        }
    } while (child = child.nextSibling);

    return node;
}

var replacements = {
    "Arthas": "Lucas",
    "Chen": "Pandor",
    "Gazlowe": "Booster",
    "Illidan": "Blake",
    "Jaina": "Naomi",
    "((Jim )|(James ))?Raynor": "Jimmy",
    "Leoric": "Leo",
    "Malfurion": "Atlas",
    "Muradin": "Kane",
    "Sylvanas": "Noire",
    "Tyrande": "Lumina",
};

for (key in replacements) {
    if (replacements.hasOwnProperty(key)) {
        var regex = new RegExp(key, "gi");
        replaceText(document.body, regex, replacements[key]);
        document.title = document.title.replace(regex, replacements[key]);
    }
}

