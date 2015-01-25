/* global Firebase */

'use strict';

var APP = window.APP = window.APP || {};

APP.user = (function(){

    var uuid; // unique user id from frirebase
    var fullName = null;
    var userRef = new Firebase(APP.db.getFbBase() + '/users');
    var names = ['Leroux', 'Bob', 'John', 'Yimmy', 'Nathan', 'Andrew', 'Harley', 'Catlin', 'Belammy', 'Lenny', 'Howard', 'Kenny', 'Louis', 'Amy', 'Ally', 'Alison', 'Jenifer', 'Bobby', 'Deandre', 'Betany', 'Joy', 'Lopez', 'Amilias', 'Courtney', 'Asha', 'Cindy', 'Camelea', 'Emily', 'Damon', 'Austin', 'Moure', 'Camy', 'Joana', 'Lizi', 'Steven', 'Pamela', 'Elizabeth', 'Marley', 'Jack', 'Jason', 'Johana', 'alisha', 'Lisa', 'Joshua', 'Casandra', 'Mary', 'Catherin', 'Dashon', 'Camry', 'Diana', 'Jordan', 'Clark', 'Kyle', 'Brandon', 'David', 'Betty', 'Erica', 'Jay', 'Precious', 'Finkle', '5000', 'Horatio', 'Ignatious', 'Greta', 'Constance', 'Kimber'];
    var adjs = ['Awesome-O', 'Noxious', 'Chesty', 'Ablaze', 'Abrupt', 'Accomplished', 'Active', 'Adored', 'Adulated', 'Adventurous', 'Affectionate', 'Amused', 'Amusing', 'Animal-like', 'Antique', 'Appreciated', 'Archaic', 'Ardent', 'Arrogant', 'Astonished', 'Audacious', 'Authoritative', 'Awestruck', 'Beaming', 'Bewildered', 'Bewitching', 'Blissful', 'Boisterous', 'Booming', 'Bouncy', 'Breathtaking', 'Bright', 'Brilliant', 'Bubbling', 'Calm', 'Calming', 'Capricious', 'Celestial', 'Charming', 'Cheerful', 'Cherished', 'Chiaroscuro', 'Chilled', 'Comical', 'Commanding', 'Companionable', 'Confident', 'Contentment', 'Courage', 'Crazy', 'Creepy', 'Dancing', 'Dazzling', 'Delicate', 'Delightful', 'Demented', 'Desirable', 'Determined', 'Devoted', 'Dominant', 'Dramatic', 'Drawn out', 'Dripping', 'Dumbstruck', 'Ebullient', 'Elated', 'Elegant', 'Enchanted', 'Energetic', 'Enthusiastic', 'Ethereal', 'Exaggerated', 'Exalted', 'Expectant', 'Expressive', 'Exuberant', 'Faint', 'Fantastical', 'Favorable', 'Febrile', 'Feral', 'Feverish', 'Fiery', 'Floating', 'Flying', 'Folksy', 'Fond', 'Forgiven', 'Forgiving', 'Freakin awesome', 'Frenetic', 'Frenzied', 'Friendly Amorous', 'From a distance', 'Frosted', 'Funny', 'Furry', 'Galloping', 'Gaping', 'Gentle', 'Giddy', 'Glacial', 'Gladness', 'Gleaming', 'Gleeful', 'Gorgeous', 'Graceful', 'Grateful', 'Halting', 'Happy', 'Haunting', 'Heavenly', 'Hidden', 'High-spirited', 'Honor', 'Hopeful', 'Hopping', 'Humble', 'Hushed', 'Hypnotic', 'Illuminated', 'Immense', 'Imperious', 'Impudent', 'In charge', 'Inflated', 'Innocent', 'Inspired', 'Intimate', 'Intrepid', 'Jagged', 'Joking', 'Joyful', 'Jubilant', 'Kindly', 'Languid', 'Larger than life', 'Laughable', 'Lickety-split', 'Lighthearted', 'Limping', 'Linear', 'Lively', 'Lofty', 'Love of', 'Lovely', 'Lulling', 'Luminescent', 'Lush', 'Luxurious', 'Magical', 'Maniacal', 'Manliness', 'March-like', 'Masterful', 'Merciful', 'Merry', 'Mischievous', 'Misty', 'Modest', 'Moonlit', 'Mysterious', 'Mystical', 'Mythological', 'Nebulous', 'Nostalgic', 'On fire', 'Overstated', 'Paganish', 'Partying', 'Perfunctory', 'Perky', 'Perplexed', 'Persevering', 'Pious', 'Playful', 'Pleasurable', 'Poignant', 'Portentous', 'Posh', 'Powerful', 'Pretty', 'Prickly', 'Prideful', 'Princesslike', 'Proud', 'Puzzled', 'Queenly', 'Questing', 'Quiet', 'Racy', 'Ragged', 'Regal', 'Rejoicing', 'Relaxed', 'Reminiscent', 'Repentant', 'Reserved', 'Resolute', 'Ridiculous', 'Ritualistic', 'Robust', 'Running', 'Sarcastic', 'Scampering', 'Scoffing', 'Scurrying', 'Sensitive', 'Serene', 'Shaking', 'Shining', 'Silky', 'Silly', 'Simple', 'Singing', 'Skipping', 'Smooth', 'Sneaky', 'Soaring', 'Sophisticated', 'Sparkling', 'Spell-like', 'Spherical', 'Spidery', 'Splashing', 'Splendid', 'Spooky', 'Sprinting', 'Starlit', 'Starry', 'Startling', 'Successful', 'Summery', 'Surprised', 'Sympathetic', 'Tapping', 'Teasing', 'Tender', 'Thoughtful', 'Thrilling', 'Tingling', 'Tinkling', 'Tongue-in-cheek', 'Totemic', 'Touching', 'Tranquil', 'Treasured', 'Trembling', 'Triumphant', 'Twinkling', 'Undulating', 'Unruly', 'Urgent', 'Veiled', 'Velvety', 'Victorious', 'Vigorous', 'Virile', 'Walking', 'Wild', 'Witty', 'Wondering', 'Zealous', 'Zestful', 'Sweaty', 'Funky', 'Smarmy', 'Persnickety'];

    var generateName = function () {
        var adj = adjs[window.getRandomInt(0, adjs.length)];
        var name = names[window.getRandomInt(0, names.length)];
        var fullName = adj + " " + name.charAt(0).toUpperCase() + name.slice(1);

        return fullName;
    };

    var updateUser = function() {
        uuid = getUUID();
        var updateUser = new Firebase(APP.db.getFbBase() + '/users/'+uuid);
        updateUser.update({ name: fullName });
        console.log('update user');
    };

    var createUser = function() {
        var newChildRef = userRef.push();
        setUUID(newChildRef.key());
        newChildRef.set({name: fullName});
        console.log('createUser: '+fullName);
    };

    var setUUID = function(id){
        uuid = id;
        $.cookie('uuid', id);
        //console.log('setUUID: '+id);
    };

    var getUUID = function(){
        var id = $.cookie('uuid');
        //console.log('getUUID: '+$.cookie('uuid'));
        return id;
    };

    var getName = function() {
        return fullName;
    };

    var setName = function(str) {
        fullName = str;
        $.cookie('name', str);
        if (typeof $.cookie('uuid') === 'undefined') {
            createUser();
        } else {
            //console.log('cookieUUID: '+$.cookie('uuid'));
            $.cookie('uuid', uuid);
            updateUser();
        }
    };

    var initNametag = function() {
        $('#onboarding').fadeIn('fast');

        var tmpName = generateName();
        $('.nametag input#user_name').val(tmpName);
        $('input#posting-as').val(tmpName);

        $('.nametag input#user_name').on("click", function () {
            $(this).select();
        });
        $('.nametag input#user_name').on("change keypress keyup", function () {
            $('input#posting-as').val($('.nametag input#user_name').val());

            window.ga('send', 'event', 'textarea', 'name change', 'onboard');
        });

        $('.nametag form#intake').on('submit', function(e){
            e.preventDefault();
            // console.log($('.nametag input#user_name').val());
            // submit name to something, user object?
            nameTagHandler();
            window.ga('send', 'event', 'submit', 'join the conversation', 'onboard');
        });
    };
    var nameTagHandler = function() {
        $('#onboarding').fadeOut('fast');
        $('input#posting-as').val($('.nametag input#user_name').val());
        setName($('.nametag input#user_name').val());
        window.player.playVideo();
    };

    var init = function() {
        console.log('APP.user');

        if (typeof $.cookie('name') === 'undefined') {
            initNametag();
        } else {
            setName($.cookie('name'));
        }
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init,
        generateName: generateName,
        setName: setName,
        getName: getName,
        getUUID: getUUID
    };

}());
