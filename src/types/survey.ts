export type SurveyType = 'diagnostic' | 'compliance' | 'processes' | 'growth';

export type SurveyTypeConfig = {
  type: SurveyType;
  label: string;
  description: string;
  templateId: string;
  icon: string;
  color: string;
};

const CONFIGS: Record<SurveyType, Omit<SurveyTypeConfig, 'type'>> = {
  diagnostic: {
    label: 'Diagnostic Questionnaire',
    description: 'Il questionario completo su processi, strumenti e organizzazione aziendale',
    templateId: import.meta.env.VITE_SURVEY_TEMPLATE_ID || '',
    icon: 'clipboard',
    color: 'cyan',
  },
  compliance: {
    label: 'IT Compliance & Normativa',
    description: 'Verifica se la tua azienda è a norma dal punto di vista IT e GDPR',
    templateId: import.meta.env.VITE_SURVEY_COMPLIANCE_TEMPLATE_ID || '',
    icon: 'shield',
    color: 'sky',
  },
  processes: {
    label: 'Maturità dei Processi',
    description: 'Scopri quanto sono automatizzati i processi interni della tua azienda',
    templateId: import.meta.env.VITE_SURVEY_PROCESSES_TEMPLATE_ID || '',
    icon: 'settings',
    color: 'amber',
  },
  growth: {
    label: 'Crescita Digitale',
    description: 'Misura il tuo posizionamento competitivo e la presenza online',
    templateId: import.meta.env.VITE_SURVEY_GROWTH_TEMPLATE_ID || '',
    icon: 'trending-up',
    color: 'emerald',
  },
};

export function getSurveyConfig(type: SurveyType): SurveyTypeConfig {
  return { type, ...CONFIGS[type] };
}

export const ALL_SURVEY_TYPES: SurveyType[] = ['diagnostic', 'compliance', 'processes', 'growth'];
export const MINOR_SURVEY_TYPES: SurveyType[] = ['compliance', 'processes', 'growth'];

export type UserSurveyEntry = {
  surveyId: string;
  surveyType: string;
  status?: string;
  hasAnswers?: boolean;
};
