export interface TheData{
    data: DataModel;
}

interface DataModel{
    survey_main: SurveyMain[],
    survey_ques: SurveyQuestion[],
    survey_ans: SurveyAnswer[],
    survey_res: SurveyResponse[],
    survey_other_info: SurveyOtherInfo[],
}

interface SurveyMain{
    id: number;
    survey_name: string;
    survey_category: string;
    logo: any;
    logo_name: any;
    no_question: number;
    expires_at: any;
    no_time_used: number,
    one_ques_at_time: boolean,
    display_ques_no: boolean,
    welcome_note: any,
    thankyou_note: any,
    uid: number,
    email_id: string,
    status: string,
    shared_at: string,
    default_chart: number,
    finish_option: string,
    inactive_msg: any,
    theme_name: string,
    logo_redirect_path: any,
    submit_notification: any,
    created_at: string,
    updated_at: string,
    font_color: string,
    form_bg: string,
    page_bg: string
}

interface SurveyQuestion{
    id: number,
    survey_id: number,
    question: string,
    answer_type: number,
    mandatory: boolean,
    answer_abbr: any,
    answer_scale: number,
    sl_no: number,
    weight: boolean,
    number_only: boolean,
    email_only: boolean,
    image_path: any,
    image_name: any,
    created_at: string,
    updated_at: string
}

interface SurveyAnswer{
    id: number,
    survey_id: number,
    survey_q_id: number,
    answer: string,
    weight: number,
    created_at: string,
    updated_at: string
}

interface SurveyResponse{
    id: number,
    survey_id: string,
    survey_title: any,
    survey_q_id: string,
    survey_question: string,
    survey_ques_type: string,
    survey_grade_id: string,
    survey_answer: string,
    feedback_answer: string,
    feedback_cid: any,
    created_at: string,
    updated_at: string
}

interface SurveyOtherInfo{
    id: number,
    survey_id: string,
    survey_q_id: number,
    report_type: string,
    label: string,
    value: string,
    sub_value: string,
    email_id: string,
    created_at: string,
    updated_at: string
}
