
function GroupThis (accessToken) {
    this.groupsURL = "https://api.groupme.com/v3/groups?token=<accessToken>".replace("<accessToken>",accessToken);
    this.groupMessagesURL = "https://api.groupme.com/v3/groups/<groupId>/messages?token=<accessToken>".replace("<accessToken>",accessToken);
    this.groupGalleryURL = "https://api.groupme.com/v3/conversations/<groupId>/gallery?token=<accessToken>".replace("<accessToken>",accessToken);
}

GroupThis.prototype.getGroupsList = function() {
    return new Promise((resolve, reject) => {
        $.getJSON(this.groupsURL)
            .done(function(data) {
                resolve(data.response);
            })
            .fail(function(jqxhr, status, error) {
                reject(status + ", " + error)
            });
    });
}

GroupThis.prototype.getGroupMessages = function(groupId) {
    return new Promise((resolve, reject) => {
        $.getJSON(this.groupMessagesURL.replace("<groupId>",groupId))
            .done(function(data) {
                resolve(data.response);
            })
            .fail(function(jqxhr, status, error) {
                reject(status + ", " + error)
            });
    });
}

GroupThis.prototype.getGroupGallery = function(groupId) {
    return new Promise((resolve, reject) => {
        $.getJSON(this.groupGalleryURL.replace("<groupId>",groupId))
            .done(function(data) {
                resolve(data.response);
            })
            .fail(function(jqxhr, status, error) {
                reject(status + ", " + error)
            });
    });
}
