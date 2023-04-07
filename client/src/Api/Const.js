let LIVE = Number(process.env.REACT_APP_LIVE);
let api_base_url, google_address_key, ladning_url;

if (LIVE === 1) {
	api_base_url = process.env.REACT_APP_LIVE_API_URL;
	ladning_url = process.env.REACT_APP_LIVE_DOMAIN;
	google_address_key = process.env.REACT_APP_LIVE_GOOGLE_ADDRESS_KEY;
} else {
	api_base_url = process.env.REACT_APP_LOCAL_API_URL;
	ladning_url = process.env.REACT_APP_LOCAL_DOMAIN;
	google_address_key = process.env.REACT_APP_LOCAL_GOOGLE_ADDRESS_KEY;
}
export const ApiBaseUrl = api_base_url;
export const GoogleAddressKEY = google_address_key;
export const LandingPageURL = ladning_url;

export const userLink = process.env.REACT_APP_LIVE_API_URL;

export const API_Path = {
	login: ApiBaseUrl + "super-admin/auth/login",
	signUp: ApiBaseUrl + "users/signup",
	loginByEmail: ApiBaseUrl + "users/login",
	getAllPost: ApiBaseUrl + "post/allpostalluser",
	topAthletes: ApiBaseUrl + "favorite/toptrendingfav",
	postLike: ApiBaseUrl + "post/createLike",
	getLikes: ApiBaseUrl + "post/getLike",
	reportPost: ApiBaseUrl + "post/reportPost",
	addToFav: ApiBaseUrl + "favorite/addfavorite",
	savePost: ApiBaseUrl + "favorite/savepost",
	getComment: ApiBaseUrl + "post/getcomment",
	getfeaturedAthlete: ApiBaseUrl + "favorite/featuredAthlete",
	getTrandingTop: ApiBaseUrl + "favorite/toptrending",
	getAllAthlete: ApiBaseUrl + "favorite/getallAthlete",
	contactus: ApiBaseUrl + "users/contactus",
	shareLink: ApiBaseUrl + "deal/shareLink",
	searchDeal: ApiBaseUrl + "deal/searchDeal",
	addMaincomment: ApiBaseUrl + "post/addComment",
	addSubcomment: ApiBaseUrl + "post/addsubcomment",
	deleteSubComment: ApiBaseUrl + "post/subcomment_delete",
	deleteMainComment: ApiBaseUrl + "post/comment_delete",
	reportSubCommet: ApiBaseUrl + "post/com_report",
	editProfile: ApiBaseUrl + "users/editpersonalinfo",
	getAllSavePost: ApiBaseUrl + "favorite/getsavepost",
	getAllFavoriteAthlete: ApiBaseUrl + "favorite/getFavoriteAthlete",
	filterAthlete: ApiBaseUrl + "favorite/filter",
	getPost: ApiBaseUrl + "post/getPost",
	getFaq: ApiBaseUrl + "users/getFaq",
	createPost: ApiBaseUrl + "post/createPost",
	addImage: ApiBaseUrl + "image/addimage",
	getTeamList: ApiBaseUrl + "team/TeamList",
	removePost: ApiBaseUrl + "favorite/removePost",
	createRePost: ApiBaseUrl + "post/repost",
	getAllUser: ApiBaseUrl + "favorite/getalluser",
	changepassword: ApiBaseUrl + "users/changepassword",
	getAllNiche: ApiBaseUrl + "users/getNiche",
	getAllSport: ApiBaseUrl + "users/getSport",
	joinTeamList: ApiBaseUrl + "team/join_TeamList",
	collegeTeamList: ApiBaseUrl + "team/college_TeamList",
	createTeam: ApiBaseUrl + "team/createTeam",
	getTeamById: ApiBaseUrl + "team/TeambyId",
	updateATeam: ApiBaseUrl + "team/TeamUpdate",
	removeUser: ApiBaseUrl + "team/RemoveUsers",
	requestAcceptByCoach: ApiBaseUrl + "team/ReqAcceptByCoach",
	requestDeclineByCoach: ApiBaseUrl + "team/Decline_Request",
	inviteMembers: ApiBaseUrl + "team/Listofinvitemembers",
	inviteTeam: ApiBaseUrl + "team/TeamInvitation",
	mainCoachReplacement: ApiBaseUrl + "team/MainCoachReplacement",
	joinTeam: ApiBaseUrl + "team/UserRequest",
	assignRNumber: ApiBaseUrl + "team/AssignRoleandNumber",
	getDeal: ApiBaseUrl + "deal/getDeal",
	getSingleDeal: ApiBaseUrl + "deal/getSingleDeal",
	socialMediaLogin: ApiBaseUrl + "users/socialMediaLogin",
	forgotPassword: ApiBaseUrl + "users/forgotPassword",
	giveDealReview: ApiBaseUrl + "deal/review",
	deleteDeal: ApiBaseUrl + "deal/deleteDeal",
	oneUserAllReview: ApiBaseUrl + "deal/getallreview",
	getEventById: ApiBaseUrl + "event/EventbyId",
	createEvent: ApiBaseUrl + "event/createEvent",
	eventUpdate: ApiBaseUrl + "event/eventUpdate",
	chatList: ApiBaseUrl + "users/get_Msg",
	getsocial: ApiBaseUrl + "deal/getsocial",
	createDeal: ApiBaseUrl + "deal/createDeal",
	coachProfile: ApiBaseUrl + "users/getCoach_profile",
	getTeamOfCoach: ApiBaseUrl + "event/teamofCoach",
	getScheduleEvent: ApiBaseUrl + "event/Schedual_event",
	getOnGoingEvent: ApiBaseUrl + "event/ongoingEventList",
	getUpComingEvent: ApiBaseUrl + "event/upcommingEventList",
	getCompletedEvent: ApiBaseUrl + "event/completedEventList",
	athleteProfile: ApiBaseUrl + "users/athlete_profile",
	additionalDetail: ApiBaseUrl + "users/getAdditional",
	athleteScore: ApiBaseUrl + "users/getScore",
	postData: ApiBaseUrl + "users/post_data",
	fanProfile: ApiBaseUrl + "users/getFan_profile",
	businessProfile: ApiBaseUrl + "users/getBusiness_profile",
	parentProfile: ApiBaseUrl + "users/getParent_profile",
	conversion: ApiBaseUrl + "users/conversion",
	getMsg: ApiBaseUrl + "users/getMsg",
	searchAthleteParent: ApiBaseUrl + "invite/searchUser",
	inviteAthleteParent: ApiBaseUrl + "invite/invitation",
	reqAthleteParent: ApiBaseUrl + "invite/getReq",
	reqAccept: ApiBaseUrl + "invite/acceptReq",
	reqDecline: ApiBaseUrl + "invite/declineReq",
	manageAthlete: ApiBaseUrl + "invite/manageathlete",
	teamJoin: ApiBaseUrl + "team/RequestsForUser",
	managePermission: ApiBaseUrl + "invite/givePermission",
	manageParent: ApiBaseUrl + "invite/manageparent",
	removeParent: ApiBaseUrl + "invite/removeParent",
	userDeclineInvitation: ApiBaseUrl + "team/Decline_Invitation",
	userAcceptInvitation: ApiBaseUrl + "team/InvitationAcceptByUser",
	getThankYouMsg: ApiBaseUrl + "socialconnect/getThankyou_msg",
	sendThankYouMsg: ApiBaseUrl + "socialconnect/thankyou_msg",
};

export const formatTimeSince = (date) => {
	const currentTime = new Date();
	const MINUTE = 1000 * 60;
	const HOUR = MINUTE * 60;
	const DAY = HOUR * 24;
	const WEEK = DAY * 7;
	const MONTH = DAY * 30;
	const YEAR = DAY * 365;
	const DECADE = DAY * 365 * 10;
	const timeDifference = currentTime - date;
	if (timeDifference < 59 * MINUTE) {
		return `${Math.round(timeDifference / MINUTE)} minutes ago`;
	} else if (timeDifference < 24 * HOUR) {
		return `${Math.round(timeDifference / HOUR)} hours ago`;
	} else if (timeDifference < 7 * DAY) {
		return `${Math.round(timeDifference / DAY)} days ago`;
	} else if (timeDifference < 5 * WEEK) {
		return `${Math.round(timeDifference / WEEK)} Week ago`;
	} else if (timeDifference < 12 * MONTH) {
		return `${Math.round(timeDifference / MONTH)} months ago`;
	} else if (timeDifference < 10 * YEAR) {
		return `${Math.round(timeDifference / YEAR)} years ago`;
	} else {
		return `${Math.round(timeDifference / DECADE)} decades ago`;
	}
};

export const phoneRegExp = /^[+]?[(]?[ 0-9]{3}[)]?[- s. ]?[0-9]{3}[-s. ]?[0-9]{4,6}$/;

export const formatDate = (date) => {
	let d = date.getDate();
	let m = date.getMonth() + 1;
	let y = date.getFullYear();
	const dateString = (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
	return dateString;
};

export const calculateAge = (birthdate) => {
	var today = new Date();
	birthdate = new Date(birthdate);
	var age = today.getFullYear() - birthdate.getFullYear();
	var m = today.getMonth() - birthdate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
		age--;
	}
	return age;
};

export const SetDate = (date) => {
	const parts = date.split("-");
	const outputDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
	return outputDate
};

export const errorContainer = (form, field) => {
	return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
};

export const formAttr = (form, field) => ({ onBlur: form.handleBlur, onChange: form.handleChange, value: form.values[field] });

export const websiteLink = process.env.REACT_APP_PUBLIC_LIVE_DOMAIN;

export const getTime = (string) => {
	let date = new Date(string);
	let localeSpecificTime = date.toLocaleTimeString();
	return localeSpecificTime;
};