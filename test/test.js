
$(document).ready(function(){
    $("#get-groups").click(function(){
        var token = $("#access-token").val();
        if (token === "") {
            alert("Please enter a GroupMe developer access token");
            return;
        }
        gt = new GroupThis(token);
        gt.getGroupsList().then(
            (data) => {
                $("#getGroupsList-output-raw").val(JSON.stringify(data, null, 2));
                $("#getGroupsList-Formatted").html("");
                $("#getGroupsList-Formatted").append('<div class="row"></div>');
                data.forEach(function(group){
                    var $members = "";
                    group.members.forEach(function(member){
                        if ($members === "") {
                            $members = member.nickname;
                        } else {
                            $members += "<br/>" + member.nickname;
                        }
                    });

                    var $card = $(".templates > .group-card").html();
                    $card = $card.replace("[group_image_url]", group.image_url)
                                .replace("[group_name]", group.name)
                                .replace("[group_message_count]", group.messages.count)
                                .replace("[group_members]", $members);
                    $("#getGroupsList-Formatted > .row").append($card);

                    $("#group-messages-select").append('<option value="' + group.id + '">' + group.name + '</option>');
                    $("#group-gallery-select").append('<option value="' + group.id + '">' + group.name + '</option>');
                });
            }, 
            (error) => {
                $("#getGroupsList-output-raw").val(error);
                $("#getGroupsList-Formatted").html(error);
                $("#group-messages-select").find('option').remove();
                $("#group-gallery-select").find('option').remove();
            });

        gt = null;
    });

    $("#get-messages").click(function(){
        var token = $("#access-token").val();
        if (token === "") {
            alert("Please enter a GroupMe developer access token");
            return;
        }

        var groupId = $("#group-messages-select").val();
        if (groupId === "") {
            alert("Please select a group to retrieve messages");
            return;
        }

        gt = new GroupThis(token);
        gt.getGroupMessages(groupId).then(
            (data) => {
                $("#getGroupMessages-output-raw").val(JSON.stringify(data, null, 2));
                $("#getGroupMessages-Formatted").html("");
                $("#getGroupMessages-Formatted").append("<h2>Showing the most recent " + data.messages.length + " of " + data.count + " messages</h2>");
                data.messages.forEach(function(message){
                    var $card = $(".templates > .message-card").html();
                    $card = $card.replace("[message_name]", message.name)
                                .replace("[message_text]", message.text)
                                .replace("[message_time]", new Date(message.created_at*1000));
                    $("#getGroupMessages-Formatted").append($card);
                });
                
            }, 
            (error) => {
                $("#getGroupMessages-output-raw").val(error);
                $("#getGroupMessages-Formatted").html(error);
            });

        gt = null;
    });

    $("#get-gallery").click(function(){
        var token = $("#access-token").val();
        if (token === "") {
            alert("Please enter a GroupMe developer access token");
            return;
        }

        var groupId = $("#group-gallery-select").val();
        if (groupId === "") {
            alert("Please select a group to retrieve gallery items");
            return;
        }

        gt = new GroupThis(token);
        gt.getGroupGallery(groupId).then(
            (data) => {
                $("#getGroupGallery-output-raw").val(JSON.stringify(data, null, 2));
                $("#getGroupGallery-Formatted").html("");
                $("#getGroupGallery-Formatted").append("<h2>Showing " + data.messages.length + " gallery items</h2>");
                $("#getGroupGallery-Formatted").append('<div class="row"></div>');
                data.messages.forEach(function(message){
                    if (message.attachments[0].type === "image") {
                        var $card = $(".templates > .gallery-card").html();
                        $card = $card.replace("[group_gallery_name]", message.name)
                                    .replace("[group_gallery_text]", message.text)
                                    .replace("[group_gallery_image_url]", message.attachments[0].url);
                        $("#getGroupGallery-Formatted > .row").append($card);    
                    }
                });
                
            }, 
            (error) => {
                $("#getGroupGallery-output-raw").val(error);
                $("#getGroupGallery-Formatted").html(error);
            });

        gt = null;
    });    
});