window.populateInbox = function(inbox, read) {
  console.log("Adding email");
  const PREFIXES = ["", "FW: ", "ACTION REQUIRED: ", "ACTION REQUESTED: ", "IMPORTANT: ", "REMINDER: ", 
                    "PENDING: ", "URGENT: "];
  const TOPICS = ["training", "meeting", "ticket", "misc"];
  
  let subject_line = "";
  let email_topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  
  if (email_topic == "training") {
    
    const TRAININGS = ["phishing detection", "diversity & inclusion", "anti-malware", "workplace safety", "cybersecurity"];
    const TRAINING_TYPES = ["course", "training", "module", "workshop"];
    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    const training = TRAININGS[Math.floor(Math.random() * TRAININGS.length)];
    const training_type = TRAINING_TYPES[Math.floor(Math.random() * TRAINING_TYPES.length)];
    const deadline = new Date().addDays(Math.random() * 30).toLocaleDateString();
    subject_line = `${prefix}Complete your online ${training} ${training_type} by ${deadline}`;
    
  } else if (email_topic == "meeting") {
    
    const MEETINGS = ["Meeting", "Touch base", "Catch up", "Call", "Chat", "Discussion", "Regroup", "Zoom"];
    const TOPICS = ["new feature", "Q4 plans", "team transition", "reported issues"];
    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const meeting = MEETINGS[Math.floor(Math.random() * MEETINGS.length)];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const hours = [9, 10, 11, 12, 1, 2, 3, 4];
    const minutes = ["00", "15", "30", "45"];
    const time = `${days[Math.floor(Math.random() * days.length)]} @ ${hours[Math.floor(Math.random() * hours.length)]}:${minutes[Math.floor(Math.random() * minutes.length)]}`;
    subject_line = `${prefix}${meeting} about ${topic} on ${time}`;
    
  } else if (email_topic == "ticket") {
    
    const GROUPS = ["DTEI", "DFMQ", "BAT", "MEAS", "IRB", "ASTR"];
    const TICKET_NUMBER = Math.floor(Math.random() * 9099) + 100;
    const ID = `[${GROUPS[Math.floor(Math.random() * GROUPS.length)]}-${TICKET_NUMBER}]`;
    const PROBLEMS = ["Bug", "Reported bug", "Data validation needed", "Update search parameter", "Update needed",
                      "Incorrect link on", "Incorrect text on", "Incorrect parameters", "Refactor needed",
                      "Inefficient loading", "Alignment problem", "Hidden text field", "Incorrect data type", "Hotfix"];
    const TRANSITIONS = ["for", "with", "on"];
    const SOURCE = ["website", "application", "mobile", "mobile application", "home page", "settings page", 
                    "landing page", "database", "frontend", "backend"];
    const problem = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
    const transition = TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)];
    const source = SOURCE[Math.floor(Math.random() * SOURCE.length)];
    subject_line = `${ID} ${problem} ${transition} ${source}`;
    
  } else {
    const PERSONAL_MESSAGES = ["Just catching up", "Just want to catch up", "Are you free next week?", 
                               "Thought you would appreciate this...", "Good news!!", "Thoughts on this?",
                               "Could use your feedback here", "CONGRATULATIONS!!! You are the lucky winner",
                               "Important update from payroll", "Action requested from HR"];
    subject_line = PERSONAL_MESSAGES[Math.floor(Math.random() * PERSONAL_MESSAGES.length)];
  }
                   
  let date = new Date().toLocaleDateString();
  let email = `<div id="email" class="${read ? "read" : "unread"}">
      <span class="email-icon material-symbols-outlined">check_box_outline_blank</span>
      <span class="email-icon material-symbols-outlined">star</span>
      <p class="subject-line">${subject_line}</p>
      <p class="date">${date}</p>
    </div>`;
  inbox.prepend(email);
}

window.populateExistingMessages = function(inbox) {
  for (let i = 0; i < 20; i++) {
    window.populateInbox(inbox, Math.floor(Math.random() * 12) > 0);
  }
}

window.renderInboxColOne = function() {
  let template = `
  <div id="inbox-col1">
	<div id="inbox-header">
      <span id="mail-icon" class="material-symbols-outlined">mail</span>
 	  <h1>K-MAIL</h1>
    </div>
  <div id="inbox-sidebar">
  	<div id="inbox-compose"><span id="write-icon" class="material-symbols-outlined">stylus</span>NEW MESSAGE</div>
    <p><span id="write-icon" class="material-symbols-outlined">inbox</span>Inbox</p>
    <p><span id="write-icon" class="material-symbols-outlined">send</span>Sent</p>
    <p><span id="write-icon" class="material-symbols-outlined">drafts</span>Drafts</p>
    <p><span id="write-icon" class="material-symbols-outlined">star</span>Starred</p>
    <p><span id="write-icon" class="material-symbols-outlined">warning</span>Spam</p>
    <p><span id="write-icon" class="material-symbols-outlined">delete</span>Trash</p>
  </div>
</div>
	`
  $('.passage').prepend(template);
}

window.renderInboxTemplate = function() {
  let template = `
<div id="inbox-col2">
   <div id="inbox-search">
      <span id="search-icon" class="material-symbols-outlined">search</span>
      <p>Search K-Mail</p>
  </div>
    <div id="inbox-emails">
    </div>
</div>
	`
  $('.passage').prepend(template);
  window.renderInboxColOne();
}

window.composeEmail = function(to, cc, subject, body) {
  let emailTemplate=`
  <div class="inbox-new-email">
	<div class='inbox-new-email-header'>NEW EMAIL
    <span id="write-icon" class="material-symbols-outlined">close</span></div>
    <div class="inbox-new-email-field">To: ${to}</div>
    <div class="inbox-new-email-field">CC: ${cc}</div>
    <div class="inbox-new-email-field">Subject: ${subject}</div>
	<div class="inbox-new-email-body">
    	${body}
     </div>
     <div class="inbox-email-bottom-toolbar">
     	<div class="inbox-email-send">SEND</div>
     	<span id="write-icon" class="material-symbols-outlined">attach_file</span>
        <span id="write-icon" class="material-symbols-outlined">link</span>
        <span id="write-icon" class="material-symbols-outlined">mood</span>
        <span id="write-icon" class="material-symbols-outlined">add_photo_alternate</span>
        <span id="write-icon" class="material-symbols-outlined">signature</span>
        <span id="write-icon" class="material-symbols-outlined">more_vert</span>
     </div>
</div>
	`;
  $('.passage').append(emailTemplate);
}