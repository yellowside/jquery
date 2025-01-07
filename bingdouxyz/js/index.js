// super search
(function() {
    var types = document.querySelectorAll('input[name="type"]');
    var fm = document.querySelector('#super-search-fm');
    var searchTx = document.querySelector('#search-text');
    var target = document.querySelector('#set-search-blank');
    var groups = document.querySelectorAll('.search-group');
    var activeType = types[0];

    init();

    function init() {
        initTarget();
        initRadio();
        initPlaceholder();
        initAction();
    }

    function initTarget() {
        target.checked = isNewWindow()
    }

    function initRadio() {
        var checked = document.querySelector('input[name="type"][value="' + getType() +'"]');

        if (checked) {
            checked.checked = true
            setGroupActive(checked);
        }
    }

    function initPlaceholder() {
        setPlaceholder(getPlaceholder())
    }

    function initAction() {
        setAction(getSearchUrl())
    }

    function setGroupActive(ele) {
        for (var i = 0; i < groups.length; i++) {
            groups[i].classList.remove('s-current');
        }

        ele.parentNode.parentNode.parentNode.classList.add('s-current');
    }


    function saveItem(k, v) {
        window.localStorage.setItem('superSearch' + k, v);
    }

    function getItem(k) {
        return window.localStorage.getItem('superSearch' + k);
    }

    function typeChange(e) {
        activeType = e.target;
        setPlaceholder(getPlaceholder());
        setAction(e.target.value);
        saveItem('type', e.target.value);
        searchTx.focus();
        setGroupActive(e.target);
    }

    function getType() {
        var type = getItem('type');

        return type || types[0].value;
    }

    function targetChange(e) {
        saveItem('newWindow', e.target.checked ? 1 : -1);
        setTarget(e.target.checked)
    }

    function fmSubmit(e) {
        e.preventDefault();

        if (searchTx.value == '') {
            searchTx.focus();

            return false
        }

        setAction(getSearchUrl() + searchTx.value);
        setTarget(isNewWindow())

        if (isNewWindow()) {
            window.open(fm.action, +new Date());
        } else {
            location.href = fm.action;
        }
    }

    function isNewWindow() {
        var isNew = getItem('newWindow');

        if (! isNew) {
            return true
        }

        return isNew == 1
    }

    function getSearchUrl() {
        return document.querySelector('input[name="type"]:checked').value;
    }

    function getPlaceholder() {
        return document.querySelector('input[name="type"]:checked').getAttribute('data-placeholder');
    }

    function setPlaceholder(value) {
        searchTx.setAttribute('placeholder', value);
    }

    function setAction(value) {
        fm.action = value;
    }

    function setTarget(newWindow) {
        if (newWindow) {
            fm.target = '_blank';
        } else {
            fm.removeAttribute('target');
        }
    }

    //bind onchange
    for (var i = 0; i < types.length; i ++) {
        types[i].addEventListener('change', typeChange);
    }

    //bind target
    target.addEventListener('change', targetChange)

    //bind fm submit
    fm.addEventListener('submit', fmSubmit);
})();
// End super Search