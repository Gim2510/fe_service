import './App.css'
import {Route, Routes} from "react-router-dom";
import {LayoutHomepage} from "./Layout/LayoutHomepage.tsx";
import {Survey} from "./Pages/Survey.tsx";
import {Protected} from "./Components/Protected/Protected.tsx";
import {AuthProvider} from "./auth/AuthContext.tsx";
import {SurveyStart} from "./Pages/SurveyStart.tsx";
import {Login} from "./Pages/Login.tsx";
import {Register} from "./Pages/Register.tsx";
import {SurveyRecap} from "./Pages/SurveyRecap.tsx";
import {Home} from "./Pages/Home.tsx";
import {VerifyEmailPage} from "./Pages/VerifyEmailPage.tsx";
import {ContactPage} from "./Pages/ContactPage.tsx";
import {LayoutSurvey} from "./Layout/LayoutSurvey.tsx";
import {UserDashboard} from "./Pages/UserDashboard.tsx";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LayoutHomepage><Home/></LayoutHomepage>}></Route>
                <Route path="/survey/start" element={<LayoutHomepage><SurveyStart /></LayoutHomepage>} />
                <Route path="/login" element={<LayoutHomepage><Login /></LayoutHomepage>} />
                <Route path="/verify-email/:_id" element={<VerifyEmailPage />}/>
                <Route path="/register" element={<LayoutHomepage><Register /></LayoutHomepage>} />
                <Route path="/survey" element={<Protected><LayoutSurvey><Survey /></LayoutSurvey></Protected>}/>
                <Route path="/survey/:survey_id/recap" element={<Protected><LayoutSurvey><SurveyRecap/></LayoutSurvey></Protected>} />
                <Route path="/contact" element={<LayoutHomepage><ContactPage/></LayoutHomepage>} />
                <Route path="/user" element={<Protected><LayoutHomepage><UserDashboard/></LayoutHomepage></Protected>} />
            </Routes>
        </AuthProvider>
    );
}

export default App
