var App=Ember.Application.create({});App.ResetScroll=Ember.Mixin.create({activate:function(){this._super(),window.scrollTo(0,0),console.log("resetting scrolls")}}),App.ApplicationAdapter=DS.FixtureAdapter.extend({}),App.Router.map(function(){this.resource("companies"),this.resource("team",function(){this.route("teamMember",{path:":teamMember_id"})}),this.resource("stream"),this.resource("about"),this.resource("careers"),this.resource("contact")}),App.CompaniesRoute=Ember.Route.extend({model:function(){return this.store.findAll("company")}}),App.TeamRoute=Ember.Route.extend({model:function(){return this.store.find("teamMember",params.teamMember_id)}}),App.TeamRoute=Ember.Route.extend({model:function(){return this.store.findAll("teamMember")}}),App.Company=DS.Model.extend({name:DS.attr("string"),aquired:DS.attr("boolean"),photo:DS.attr("string"),location:DS.attr("string"),url:DS.attr("string"),twitter:DS.attr("string"),angelList:DS.attr("string")}),App.TeamMember=DS.Model.extend({name:DS.attr("string"),director:DS.attr("boolean"),title:DS.attr("string"),photo:DS.attr("string"),text:DS.attr("string"),twitter:DS.attr("string"),linkedIn:DS.attr("string")}),App.ApplicationView=Ember.View.extend({didInsertElement:function(){$(window).load(function(){var a=$(".container, .loginWrapper, .dashboard");$(a).css("min-height",$("html").innerHeight()-$("nav").innerHeight()-$("footer").innerHeight())}),$(window).resize(function(){$(".container").css("min-height",$("html").innerHeight()-$("nav").innerHeight()-$("footer").innerHeight())})}}),App.ContactView=Ember.View.extend({templateName:"contact",name:"",email:"",message:"",actions:{submit:function(a){$.ajax({type:"POST",url:"https://mandrillapp.com/api/1.0/messages/send.json",data:{key:"ZMiPM6bTRAzqjOaIqzn-tA",message:{from_email:this.get("email"),to:[{email:"hello@wikitongues.org",name:"Wikitongues",type:"to"}],autotext:"true",subject:"New Message: "+this.get("message"),html:"Name of submitter: "+this.get("name")+"<br/>Email: "+this.get("email")+"<br/>Message: "+this.get("message")}}}).done(function(a){var b=a[0].status;"sent"==b&&$("section.success").show(),$("body").addClass("modalFreeze")})}}}),App.SubmitView=Ember.View.extend({templateName:"submit",name:"",email:"",link:"",speaker:"",language:"",videoLocation:"",transcription:"",translation:"",message:"",actions:{submit:function(a){$.ajax({type:"POST",url:"https://mandrillapp.com/api/1.0/messages/send.json",data:{key:"ZMiPM6bTRAzqjOaIqzn-tA",message:{from_email:this.get("email"),to:[{email:"hello@wikitongues.org",name:"Wikitongues",type:"to"}],autotext:"true",subject:"New Video:"+this.get("language"),html:"Name of submitter: "+this.get("name")+"<br/>Email: "+this.get("email")+"<br/>Link to the video: "+this.get("link")+"<br/>Name of speaker: "+this.get("speaker")+"<br/>Languages spoken: "+this.get("language")+"<br/>Location of video: "+this.get("videoLocation")+"<br/>Transcription: "+this.get("transcription")+"<br/>Translation: "+this.get("translation")+"<br/>Message: "+this.get("message")+"<br/>Release Form: "+this.get("releaseForm")}}}).done(function(a){var b=a[0].status;"sent"==b&&$("section.success").show(),$("body").addClass("modalFreeze")})}}}),App.VolunteerView=Ember.View.extend({templateName:"volunteer",name:"",email:"",location:"",other:"",message:"",actions:{submit:function(a){$.ajax({type:"POST",url:"https://mandrillapp.com/api/1.0/messages/send.json",data:{key:"ZMiPM6bTRAzqjOaIqzn-tA",message:{from_email:this.get("email"),to:[{email:"hello@wikitongues.org",name:"Wikitongues",type:"to"}],autotext:"true",subject:"New Volunteer:"+this.get("location"),html:"Name of submitter: "+this.get("name")+"<br/>Email: "+this.get("email")+"<br/>Location of volunteer: "+this.get("location")+"<br/>Ambassador: "+this.get("ambassador")+"<br/>Social Media: "+this.get("socialMedia")+"<br/>Developer: "+this.get("webDev")+"<br/>Other: "+this.get("other")+"<br/>Message: "+this.get("message")}}}).done(function(a){var b=a[0].status;"sent"==b&&$("section.success").show(),$("body").addClass("modalFreeze")})}}}),App.HeaderNavComponent=Ember.Component.extend({actions:{toggleNavMenu:function(){console.log("hi"),$("headerNav").toggleClass("open")}}}),App.BookController=Ember.ObjectController.extend({sourcePhrase:"",targetPhrase:"",actions:{focused:function(){alert("f")},favorite:function(){this.toggleProperty("favorite")},editability:function(){$(this).toggleClass("toggled"),this.toggleProperty("editing")},privacy:function(){$(this).toggleClass("toggled"),this.toggleProperty("privacy")},moreInfo:function(){$(".icon.more").toggleClass("close"),$(".moreInfo").toggleClass("open")},addPhrase:function(){$(".newPhrase").show().toggleClass("open");var a=$(".book").scrollTop();$(".book .phrases .entries").append("<li class='entry'><ul><li class='source'><p><span class='progress'><span></span><span></span><span></span></span></p></li></ul></li>"),$(".book").scrollTop(a+100),console.log("scrollTop")},saveSource:function(){""!=$(".newPhrase .input.source").val()&&($(".book .phrases .entries .entry:last-of-type ul li.source p").html($(".newPhrase .input.source").val()).parent().parent().append("<li class='target'><p><span class='progress'><span></span><span></span><span></span></span></p></li>"),$(".newPhrase .input.source").hide(),$(".newPhrase .input.target").show(),$(".newPhrase .saveSource").hide(),$(".newPhrase .saveTarget").show(),$(".newPhrase .input.source").val(""));var a=$(".book").scrollTop();$(".book").scrollTop(a+100)},saveTarget:function(){if(""!=$(".newPhrase .input.target").val()){$(".newPhrase .input.source").show(),$(".newPhrase .input.target").hide(),$(".newPhrase .saveSource").show(),$(".newPhrase .saveTarget").hide(),$(".newPhrase .input.target").val(""),$(".newPhrase").toggleClass("open");var a=$(".book").scrollTop();$(".book").scrollTop(a+100);var b=this.store.createRecord("phrase",{sourcePhrase:this.get("sourcePhrase"),targetPhrase:this.get("targetPhrase"),book:this.get("model"),createdAt:new Date}),c=this;b.save().then(function(a){c.set("sourcePhrase",""),c.set("targetPhrase",""),c.get("model.phrases").addObject(a)})}$(".book .phrases .entries .entry:last-of-type").remove()}}}),App.CompaniesController=Ember.ArrayController.extend({}),App.DashboardController=Ember.ArrayController.extend({phrasesCount:Ember.computed.alias("length"),actions:{favorite:function(){this.toggleProperty("favorite")}}}),App.HeaderNavController=Ember.Controller.extend({actions:{toggleNavMenu:function(){console.log("hi"),$("headerNav").toggleClass("open")}}}),App.SubmitController=Ember.Controller.extend({actions:{openGuidelines:function(){$(".guidelines").toggle()},openTOS:function(){$(".termsOfService").toggle()}}}),App.VolunteerController=Ember.Controller.extend({actions:{openGuidelines:function(){$(".guidelines").toggle()}}}),App.FormModalComponent=Ember.Component.extend({actions:{closeModal:function(){$("section.success").hide()}}}),App.GoogleMapsComponent=Ember.Component.extend({latitude:"",longitude:"",insertMap:function(){var a=this.$(".map-canvas"),b={center:new google.maps.LatLng(this.get("latitude"),this.get("longitude")),zoom:2,disableDefaultUI:1,mapTypeControl:!1,minZoom:2,mapTypeId:google.maps.MapTypeId.ROADMAP};new google.maps.Map(a[0],b)}.on("didInsertElement")}),App.HeaderNavComponent=Ember.Component.extend({actions:{toggleNavMenu:function(){$("ul.headerNav").toggleClass("open")}}}),App.ReleaseFormsComponent=Ember.Component.extend({actions:{hideTOS:function(){$(".termsOfService").hide()}}}),App.SubmitGuidelinesComponent=Ember.Component.extend({actions:{hideGuidelines:function(){$(".guidelines").hide()}}}),App.VolunteerGuidelinesComponent=Ember.Component.extend({actions:{hideGuidelines:function(){$(".guidelines").hide()}}}),App.Company.FIXTURES=[{id:1,name:"WeHostels",aquired:"StudentUniverse",photo:"/images/companies/weHostels.png",location:"New York, NY",url:"http://www.wehostels.com",twitter:"http://twitter.com/wehostels",angelList:"http://angel.co/wehostels'"},{id:2,name:"BrightNest",aquired:"Angies List",photo:"/images/companies/brightNest.png",location:"New York, NY",url:"http://brightnest.com/",twitter:"http://twitter.com/brightnest",angelList:"http://angel.co/brightnest'"},{id:3,name:"Grand St.",aquired:"Etsy",photo:"/images/companies/grandSt.png",location:"New York, NY",url:"http://www.grand.st",twitter:"http://twitter.com/grandst",angelList:"http://angel.co/grandst'"},{id:4,name:"HitPost",aquired:"Yahoo!",photo:"/images/companies/hitPost.png",location:"New York, NY",url:"http://hitpost.com/",twitter:"http://twitter.com/hitpost",angelList:"http://angel.co/hitpost'"},{id:5,name:"LawPivot",aquired:"RocketLawyer",photo:"/images/companies/lawPivot.png",location:"New York, NY",url:"http://www.lawpivot.com",twitter:"http://twitter.com/lawpivot",angelList:"http://angel.co/lawpivot'"},{id:6,name:"Locu",aquired:"GoDaddy",photo:"/images/companies/locu.png",location:"New York, NY",url:"http://www.locu.com",twitter:"http://twitter.com/locu",angelList:"http://angel.co/locu'"},{id:7,name:"SnapJoy",aquired:"Dropbox",photo:"/images/companies/snapJoy.png",location:"New York, NY",url:"http://www.snapjoy.com",twitter:"http://twitter.com/snapjoy",angelList:"http://angel.co/snapjoy'"},{id:8,name:"Stypi",aquired:"Salesforce",photo:"/images/companies/stypi.png",location:"New York, NY",url:"http://www.stypi.com",twitter:"http://twitter.com/stypi",angelList:"http://angel.co/stypi'"},{id:9,name:"TapEngage",aquired:"Dropbox",photo:"/images/companies/tapEngage.png",location:"New York, NY",url:"http://www.tapengage.com",twitter:"http://twitter.com/tapengage",angelList:"http://angel.co/stypi'"},{id:10,name:"Admitted.ly",aquired:"",photo:"/images/companies/admittedly.png",location:"New York, NY",url:"http://www.admitted.ly",twitter:"http://twitter.com/admitted_ly",angelList:"http://angel.co/admitted-ly'"},{id:11,name:"Artsicle",aquired:"",photo:"/images/companies/artsicle.png",location:"New York, NY",url:"http://www.artsicle.com",twitter:"http://twitter.com/artsicle",angelList:"http://angel.co/artsicle'"},{id:12,name:"Amicus",aquired:"",photo:"/images/companies/amicus.png",location:"New York, NY",url:"http://www.amicus.com",twitter:"http://twitter.com/amicushq",angelList:"http://angel.co/amicus'"},{id:13,name:"Adcade",aquired:"",photo:"/images/companies/adcade.png",location:"New York, NY",url:"http://www.adcade.com",twitter:"http://twitter.com/adcade",angelList:"http://angel.co/adcade'"},{id:14,name:"August",aquired:"",photo:"/images/companies/august.png",location:"San Francisco, CA",url:"http://www.august.com",twitter:"http://twitter.com/AugustSmartLock",angelList:"http://angel.co/august-2'"},{id:15,name:"Bench",aquired:"",photo:"/images/companies/bench.png",location:"Vancouver, BC",url:"http://www.bench.co",twitter:"http://twitter.com/benchaccounting",angelList:"http://angel.co/bench'"},{id:16,name:"Brass Monkey",aquired:"",photo:"/images/companies/brassMonkey.png",location:"Boston MA",url:"http://www.playbrassmonkey.com",twitter:"http://twitter.com/brassmonkey",angelList:"http://angel.co/brassmonkey'"},{id:17,name:"BringMeThat",aquired:"",photo:"/images/companies/bringMeThat.png",location:"New York, NY",url:"http://www.bringmethat.com",twitter:"http://twitter.com/bringmethat",angelList:"http://angel.co/bringmethat'"},{id:18,name:"Circa",aquired:"",photo:"/images/companies/circa.png",location:"San Francisco, CA",url:"http://www.cir.ca",twitter:"http://twitter.com/circanews",angelList:"http://angel.co/circa'"},{id:19,name:"Clip",aquired:"",photo:"/images/companies/clip.png",location:"San Francisco, CA",url:"http://www.cliplabs.com",twitter:"http://twitter.com/cliplabs",angelList:"http://angel.co/clip'"},{id:20,name:"Clothia",aquired:"",photo:"/images/companies/clothia.png",location:"San Francisco, CA",url:"http://www.clothia.com",twitter:"http://twitter.com/clothia",angelList:"http://angel.co/clothia'"},{id:21,name:"Comprehend",aquired:"",photo:"/images/companies/comprehend.png",location:"San Francisco, CA",url:"http://www.comprehend.com",twitter:"http://twitter.com/comprehend",angelList:"http://angel.co/comprehend'"},{id:22,name:"Disruption Corporation",aquired:"",photo:"/images/companies/disruptionCorporation.png",location:"Washington, DC",url:"http://www.disruption.vc",twitter:"http://twitter.com/disruptioncorp",angelList:"http://angel.co/disruption-corporation'"},{id:23,name:"Docracy",aquired:"",photo:"/images/companies/docracy.png",location:"New York, NY",url:"http://www.docracy.com",twitter:"http://twitter.com/docracy",angelList:"http://angel.co/docracy'"},{id:24,name:"Faith Street",aquired:"",photo:"/images/companies/faithStreet.png",location:"New York, NY",url:"http://www.faithstreet.com",twitter:"http://twitter.com/faithstreet",angelList:"http://angel.co/faithstreet'"},{id:25,name:"Field Lens",aquired:"",photo:"/images/companies/fieldLens.png",location:"New York, NY",url:"http://www.fieldlens.com",twitter:"http://twitter.com/fieldlens",angelList:"http://angel.co/fieldlens'"},{id:26,name:"IdeaMe",aquired:"",photo:"/images/companies/ideaMe.png",location:"Buenos Aires, Argentina",url:"http://www.idea.me",twitter:"http://twitter.com/ideame",angelList:"http://angel.co/ideame'"},{id:27,name:"IMRSV",aquired:"",photo:"/images/companies/imrsv.png",location:"New York, NY",url:"http://www.imrsv.com",twitter:"http://twitter.com/imrsv",angelList:"http://angel.co/imrsv'"},{id:28,name:"Keychain Logistics",aquired:"",photo:"/images/companies/keychainLogistics.png",location:"New York, NY",url:"http://keychainlogistics.com",twitter:"http://twitter.com/keychain",angelList:"http://angel.co/keychain-logistics'"},{id:29,name:"Knodes",aquired:"",photo:"/images/companies/knodes.png",location:"New York, NY",url:"http://www.knod.es",twitter:"http://twitter.com/knodes",angelList:"http://angel.co/knodes'"},{id:30,name:"LaunchRock",aquired:"",photo:"/images/companies/launchRock.png",location:"San Francisco, CA",url:"http://www.launchrock.com",twitter:"http://twitter.com/launchrock",angelList:"http://angel.co/launchrock'"},{id:31,name:"Loverly",aquired:"",photo:"/images/companies/loverly.png",location:"New York, NY",url:"http://www.lover.ly",twitter:"http://twitter.com/loverly",angelList:"http://angel.co/loverly'"},{id:32,name:"Matchbook",aquired:"",photo:"/images/companies/matchbook.png",location:"New York, NY",url:"http://www.matchbook.co",twitter:"http://twitter.com/matchbook",angelList:"http://angel.co/matchbook'"},{id:33,name:"Memoir",aquired:"",photo:"/images/companies/memoir.png",location:"New York, NY",url:"http://www.mymemoir.com",twitter:"http://twitter.com/memoir",angelList:"http://angel.co/memoir'"},{id:34,name:"Moveline",aquired:"",photo:"/images/companies/moveline.png",location:"Las Vegas, NV",url:"http://www.moveline.com",twitter:"http://twitter.com/moveline",angelList:"http://angel.co/moveline'"},{id:35,name:"Nestio",aquired:"",photo:"/images/companies/nestio.png",location:"New York, NY",url:"http://www.nestio.com",twitter:"http://twitter.com/nestio",angelList:"http://angel.co/nestio'"},{id:36,name:"Paintzen",aquired:"",photo:"/images/companies/paintzen.png",location:"New York, NY",url:"http://www.paintzen.com",twitter:"http://twitter.com/paintzen",angelList:"http://angel.co/paintzen'"},{id:37,name:"SmartAsset",aquired:"",photo:"/images/companies/smartAsset.png",location:"New York, NY",url:"http://www.smartasset.com",twitter:"http://twitter.com/smartasset",angelList:"http://angel.co/smartasset'"},{id:38,name:"SmileBack",aquired:"",photo:"/images/companies/smileBack.png",location:"New York, NY",url:"http://www.smileback.com",twitter:"http://twitter.com/smileback",angelList:"http://angel.co/smileback'"},{id:39,name:"SponsorHub",aquired:"",photo:"/images/companies/sponsorHub.png",location:"New York, NY",url:"http://www.sponsorhub.com",twitter:"http://twitter.com/sponsorhub",angelList:"http://angel.co/sponsorhub'"},{id:40,name:"SupplyHog",aquired:"",photo:"/images/companies/supplyHog.png",location:"Chattanooga, TN",url:"http://www.supplyhog.com",twitter:"http://twitter.com/supplyhog",angelList:"http://angel.co/supplyhog'"},{id:41,name:"TagStand",aquired:"",photo:"/images/companies/tagStand.png",location:"San Francisco, CA",url:"http://www.tagstand.com",twitter:"http://twitter.com/tagstand",angelList:"http://angel.co/tagstand'"},{id:42,name:"TapAd",aquired:"",photo:"/images/companies/tapAd.png",location:"New York, NY",url:"http://www.tapad.com",twitter:"http://twitter.com/tapad",angelList:"http://angel.co/tapad'"},{id:43,name:"Thinkful",aquired:"",photo:"/images/companies/thinkful.png",location:"New York, NY",url:"http://www.thinkful.com",twitter:"http://twitter.com/thinkful",angelList:"http://angel.co/thinkful'"},{id:44,name:"ThinkUp",aquired:"",photo:"/images/companies/thinkUp.png",location:"New York, NY",url:"http://www.thinkup.com",twitter:"http://twitter.com/thinkup",angelList:"http://angel.co/anil-dash'"},{id:45,name:"Versa",aquired:"",photo:"/images/companies/versa.png",location:"New York, NY",url:"http://www.versahq.com",twitter:"http://twitter.com/versa",angelList:"http://angel.co/versa'"},{id:46,name:"Videolicious",aquired:"",photo:"/images/companies/videolicious.png",location:"New York, NY",url:"http://www.videolicious.com",twitter:"http://twitter.com/videolicious",angelList:"http://angel.co/videolicious'"},{id:47,name:"Wallaby",aquired:"",photo:"/images/companies/wallaby.png",location:"Passadena, CA",url:"http://www.walla.by",twitter:"http://twitter.com/wallabycard",angelList:"http://angel.co/wallaby-financial'"},{id:48,name:"WePow",aquired:"",photo:"/images/companies/wePow.png",location:"New York, NY",url:"http://www.wepow.com",twitter:"http://twitter.com/gowepow",angelList:"http://angel.co/wepow'"},{id:49,name:"YesGraph",aquired:"",photo:"/images/companies/yesGraph.png",location:"San Francisco, CA",url:"http://www.yesgraph.com",twitter:"http://twitter.com/yesgraph",angelList:"http://angel.co/yesgraph'"},{id:50,name:"Zerply",aquired:"",photo:"/images/companies/zerply.png",location:"San Francisco, CA",url:"http://www.zerply.com",twitter:"http://twitter.com/zerply",angelList:"http://angel.co/zerply'"}],App.TeamMember.FIXTURES=[{id:1,name:"Pedro Torres Picón",director:!0,title:"Managing Director",photo:"public/images/team/pedro.jpg",text:"My name is Pedro. I’m the father of a grown son who is off at college. I like to be in harmony with the world around me. Wow, that sounds new age, but I’m very down to earth ;-) I like to read a lot and keep up with many things–politics, social issues, culture, travels, people.",twitter:"http://www.twitter.com/pedrotp",linkedIn:"http://www.linkedin.com/in/pedrotp'"},{id:2,name:"Scott Wolfgang",director:!0,title:"Managing Director",photo:"public/images/team/scott.jpg",text:"My name is Scott. I’m looking for a companion–somone with her own life, with a strong personality, yet also able to make the compromises that life sometimes requires. Someone who isn’t too thin and who is able to laugh at herself. No smokers, please.",twitter:"http://www.twitter.com/swolfgang",linkedIn:"http://www.linkedin.com/in/swolfgang'"},{id:3,name:"Evan Korth",director:!1,title:"Partner",photo:"public/images/team/evan.jpg",text:"My name is Evan. Originally from Australia, I’ve been living in the U.S. for a long time. I travel a lot–for my job as a journalist, and also just because I love the surprise of the unknown. I love to learn about new places, people and cultures.",twitter:"http://www.twitter.com/evankorth",linkedIn:"http://www.linkedin.com/in/evan-korth/28/b95/b32'"},{id:4,name:"Rick Webb",director:!1,title:"Partner",photo:"public/images/team/rick.jpg",text:"My name is Rick. I especially value humor, being able to laugh at yourself, being able to communicate, culture in general, social issues, staying healthy, and the freedom to think out of the box. I also like Woody Allen films, swimming, hearing people’s stories, and simply talking with people.",twitter:"http://www.twitter.com/rickwebb",linkedIn:"http://www.linkedin.com/in/rick-webb/0/1b0/376'"}];