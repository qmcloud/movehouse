require.config({
    paths: {
        'voicenotice': '../addons/voicenotice/js/voicenotice'
    }
});

if (window.Config.actionname == "index" && window.Config.controllername == "index") {
    require(['voicenotice'], function f(voicenotice) {
        voicenotice.start();
    })
}