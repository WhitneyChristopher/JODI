var gStorage = {};

function toogle(anImage, anAltSrcArr) {
    if (typeof(anImage) === "undefined" || typeof(anAltSrcArr) === "undefined" || anAltSrcArr.length === 0) {
        return;
    }

    var id = anImage.id;
    var oldSrc = anImage.src;

    if (typeof(gStorage[id]) === "undefined") {
        gStorage[id] = {
            'id': id,
            'origSrc': oldSrc,
            'i': 0
        };
    }

    gStorage[id].i += 1;
    if (gStorage[id].i > anAltSrcArr.length) {
        gStorage[id].i = 0;
    }

    if (gStorage[id].i === 0) {
        anImage.src = gStorage[id].origSrc;
    } else {
        anImage.src = anAltSrcArr[gStorage[id].i - 1];
    }
}
