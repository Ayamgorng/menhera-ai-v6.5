const fs = require('fs');

function addBadword(kata, _toxic) {
    if (!_toxic.includes(kata)) {
        _toxic.push(kata);
    }
}

function delBadword(kata, _toxic) {
    const index = _toxic.indexOf(kata);
    if (index !== -1) {
        _toxic.splice(index, 1);
    }
}

function isKasar(kata, _toxic) {
    return _toxic.includes(kata);
}

function addCountKasar(sender, _toxic) {
    const entry = _toxic.find(e => e.id === sender);
    if (entry) {
        entry.count += 1;
    }
}

function isCountKasar(sender, _toxic) {
    const entry = _toxic.find(e => e.id === sender);
    if (entry) {
        return entry.count >= 5;
    } else {
        _toxic.push({ id: sender, count: 1 });
        return false;
    }
}

function delCountKasar(sender, _toxic) {
    const index = _toxic.findIndex(e => e.id === sender);
    if (index !== -1) {
        _toxic.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    addBadword,
    delBadword,
    isKasar,
    addCountKasar,
    isCountKasar,
    delCountKasar
};

/*const fs = require('fs');

function addBadword(kata, _toxic) {
    _toxic.push(kata);
}

function delBadword(kata, _toxic) {
    const index = _toxic.indexOf(kata);
    if (index !== -1) {
        _toxic.splice(index, 1);
    }
}

function isKasar(kata, _toxic) {
    return _toxic.includes(kata);
}

function addCountKasar(sender, _toxic) {
    let found = false;
    Object.keys(_toxic).forEach((i) => {
        if (_toxic[i].id === sender) {
            found = i;
        }
    });
    if (found !== false) {
        _toxic[found].count += 1;
    }
}

function isCountKasar(sender, _toxic) {
    let found = false;
    for (let i of _toxic) {
        if (i.id === sender) {
            if (i.count >= 5) {
                return true;
            } else {
                return false;
            }
        }
    }
    if (!found) {
        const obj = { id: sender, count: 1 };
        _toxic.push(obj);
        return false;
    }
}

function delCountKasar(sender, _toxic) {
    Object.keys(_toxic).forEach((i) => {
        if (_toxic[i].id === sender) {
            _toxic.splice(i, 1);
        }
    });
    return true;
}

module.exports = {
    addBadword,
    delBadword,
    isKasar,
    addCountKasar,
    isCountKasar,
    delCountKasar
};
*/