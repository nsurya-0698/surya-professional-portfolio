const PROFILE_NAME_PATTERN =
  /\b(surya(?: teja)?(?: nammi)?|nammi|this profile|profile owner)\b/i;
const PROFILE_PRONOUN_PATTERN = /\b(he|his|him)\b/i;
const PROFILE_WORK_PATTERN =
  /\b(work|worked|role|job|build|built|develop|developed|experience|impact|project|skill|certification|education|degree|hire|fit|background|career)\b/i;
const PROFILE_POSSESSIVE_ASSET_PATTERN =
  /\b(?:surya'?s|his|this)\s+(?:resume|résumé|cv|portfolio|experience|background|career|skills?|projects?|certifications?|education)\b/i;
const PROFILE_ACTION_ASSET_PATTERN =
  /\b(?:view|open|download|share|show|review)\s+(?:(?:surya'?s|his|the|this)\s+)?(?:resume|résumé|cv|portfolio)\b/i;
const PROFILE_SHORTCUT_PATTERN =
  /^(?:(?:what are|show me|tell me)\s+)?(?:(?:the|surya'?s|his)\s+)?(?:(?:top|main|strongest)\s+)?(?:skills?|projects?|certifications?|education|experience|contact|resume|résumé|cv|portfolio)(?:\s+please)?[?!.]*$/i;
const PROFILE_COMPANY_PATTERN =
  /\b(oracle|quest diagnostics|optum|unitedhealth|hdfc|paytm|umkc)\b/i;
const PROFILE_COMPANY_CONTEXT_PATTERN =
  /\b(?:experience|role|job|employment|projects?)\s+(?:at|with)\s+(?:oracle|quest diagnostics|optum|unitedhealth|hdfc|paytm)\b|\b(?:oracle|quest diagnostics|optum|unitedhealth|hdfc|paytm)\s+(?:experience|role|job|employment|projects?)\b/i;

const WEATHER_TOPIC_PATTERN =
  /\b(weather|temperature|forecast|conditions?|rain|raining|snow|snowing|humidity|humid|wind|windy|sunny|hot|cold)\b/i;
const WEATHER_DEFINITION_PATTERN =
  /^(?:what is|what's)\s+(?:a\s+)?(?:weather|weather forecast|forecast)\s*[?!.]*$/i;
const WEATHER_SCIENCE_PATTERN =
  /\b(physics|thermodynamics|turbine|energy|cycle|formation|climate science|why does|how does|explain how|work|works|happen|forms?|forecasting)\b/i;
const WEATHER_DIRECT_PATTERN =
  /^(?:(?:what(?:'s| is)|how(?:'s| is)|check|show|tell me)\s+(?:the\s+)?)?(?:current\s+|live\s+)?(?:weather|forecast|conditions?)\b/i;
const WEATHER_LOCATION_SUFFIX_PATTERN =
  /^[a-z0-9][a-z0-9 .,'-]{1,80}\s+(?:weather|forecast|conditions?)(?:\s+(?:today|now|tonight|tomorrow))?[?!.]*$/i;
const WEATHER_WITH_LOCATION_PATTERN =
  /\b(?:weather|forecast|conditions?|temperature|humidity|wind|rain|snow|hot|cold)\b[^?!.]*\b(?:in|at|for|near)\s+[a-z]/i;
const WEATHER_STATUS_PATTERN =
  /(?:\b(?:is it|will it|is there|what(?:'s| is) it)\b[^?!.]*\b(?:raining|rain|snowing|snow|sunny|hot|cold|windy|humid)\b[^?!.]*\b(?:in|at|for|near)\s+[a-z]|\bhow (?:hot|cold) is it\b[^?!.]*\b(?:in|at|for|near)\s+[a-z])/i;

const CURRENT_DATA_PATTERN =
  /\b(latest news|breaking news|live score|current score|stock price|share price|traffic|flight status|election result|exchange rate)\b/i;
const CURRENT_TIME_SIGNAL_PATTERN =
  /\b(latest|newest|current|currently|right now|today|tonight|now|this week|this month|this year|recent|recently|yesterday|last night|next|upcoming)\b|\bwhat(?:'s| is) new\b/i;
const CURRENT_FACT_SUBJECT_PATTERN =
  /\b(news|headlines?|updates?|events?|happened|happening|president|prime minister|governor|mayor|ceo|cto|cfo|chief executive|leader|version|release|model|scores?|schedules?|status|outage|prices?|rates?|rankings?|results?|stocks?|market|close|closed|earnings|games?|matches?|date|deadline)\b/i;
const CURRENT_ROLE_HOLDER_PATTERN =
  /\b(?:who is|who's|name)\b[^?!.]{0,80}\b(?:president|prime minister|governor|mayor|ceo|cto|cfo|chief executive|leader)\b|\bwho\s+(?:currently\s+)?(?:runs|leads|heads)\b|^[a-z0-9][a-z0-9 .&'-]{0,80}\s+(?:ceo|cto|cfo|chief executive|president|leader)\s*[?!.]*$/i;
const CURRENT_NEWS_PATTERN =
  /\b(?:news|headlines?)\s+(?:about|on|for)\b|\b(?:tell|show|give)\s+me\s+(?:the\s+)?(?:news|headlines?)\b/i;
const WHATS_NEW_PATTERN = /\bwhat(?:'s| is) new\b/i;
const CONTACT_REQUIRED_PATTERNS = [
  /\b(salary|compensation|total comp|base pay|base salary|pay expectation|expected pay|hourly rate|equity expectation|bonus expectation)\b/i,
  /\b(visa|visa status|sponsorship|work authorization|employment authorization|notice period|availability|start date)\b/i,
  /\b(citizen|citizenship|immigration|immigration status|nationality|h[- ]?1b|green card|permanent resident|residency status|employment authorization document|ead status)\b/i,
  /\b(relocation|relocate|remote preference|hybrid preference|onsite preference)\b/i,
  /\b(age|date of birth|married|family|home address|personal life|hobbies|hobby|favorite|favourite)\b/i,
];
const PROMPT_INJECTION_PATTERN =
  /\b(ignore (?:all |your |previous )?instructions|reveal (?:the )?(?:system )?prompt|jailbreak|pretend|fabricate|invent|output grounded|end of context)\b/i;
const VAGUE_CONTINUATION_PATTERN =
  /^(?:just guess|can you estimate|could you estimate|give me (?:a )?(?:number|guess)|what about|how about|tell me more|and|also|why|where|when)(?:\b|[?!.])/i;

export const requiresDirectContact = (message) =>
  CONTACT_REQUIRED_PATTERNS.some((pattern) => pattern.test(message)) ||
  PROMPT_INJECTION_PATTERN.test(message);

export const isWeatherQuestion = (message) => {
  const value = String(message || '').trim();
  if (!WEATHER_TOPIC_PATTERN.test(value) || WEATHER_DEFINITION_PATTERN.test(value)) return false;
  if (WEATHER_STATUS_PATTERN.test(value)) return true;
  if (WEATHER_SCIENCE_PATTERN.test(value)) return false;

  return (
    WEATHER_DIRECT_PATTERN.test(value) ||
    WEATHER_LOCATION_SUFFIX_PATTERN.test(value) ||
    WEATHER_WITH_LOCATION_PATTERN.test(value)
  );
};

const isExplicitProfileQuestion = (message) =>
  PROFILE_NAME_PATTERN.test(message) ||
  PROFILE_POSSESSIVE_ASSET_PATTERN.test(message) ||
  PROFILE_ACTION_ASSET_PATTERN.test(message) ||
  PROFILE_SHORTCUT_PATTERN.test(message.trim()) ||
  (/\b(?:this|the) candidate\b/i.test(message) && PROFILE_WORK_PATTERN.test(message)) ||
  PROFILE_COMPANY_CONTEXT_PATTERN.test(message);

const isPronounProfileQuestion = (message) =>
  PROFILE_PRONOUN_PATTERN.test(message) &&
  (PROFILE_WORK_PATTERN.test(message) || PROFILE_COMPANY_PATTERN.test(message));

const isUnsupportedLiveQuestion = (message) =>
  CURRENT_DATA_PATTERN.test(message) ||
  CURRENT_ROLE_HOLDER_PATTERN.test(message) ||
  CURRENT_NEWS_PATTERN.test(message) ||
  WHATS_NEW_PATTERN.test(message) ||
  (CURRENT_TIME_SIGNAL_PATTERN.test(message) && CURRENT_FACT_SUBJECT_PATTERN.test(message));

const classifyStandaloneQuestion = (message) => {
  const profile =
    isExplicitProfileQuestion(message) ||
    isPronounProfileQuestion(message) ||
    (PROFILE_PRONOUN_PATTERN.test(message) && requiresDirectContact(message));
  const weather = isWeatherQuestion(message);

  if ((profile || (PROFILE_PRONOUN_PATTERN.test(message) && weather)) && weather) return 'mixed';
  if (profile && requiresDirectContact(message)) return 'profile-unknown';
  if (profile) return 'profile';
  if (weather) return 'weather';
  if (isUnsupportedLiveQuestion(message)) return 'live-unsupported';
  return 'general';
};

const routeFamily = (route) => {
  if (route === 'profile' || route === 'profile-unknown') return 'profile';
  return route;
};

const isMultiwordWhatAboutTopic = (message) => {
  const match = message.trim().match(/^what about\s+(.+?)[?!.]*$/i);
  if (!match) return false;

  const topicWords = match[1]
    .replace(/\b(?:a|an|the)\b/gi, ' ')
    .replace(/[^a-z0-9+#.-]+/gi, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return topicWords.length >= 2;
};

const classifyWithPriorRoute = (message, priorRoute) => {
  const standaloneRoute = classifyStandaloneQuestion(message);
  const hasPronoun = PROFILE_PRONOUN_PATTERN.test(message);
  const explicitlyNamesProfile = PROFILE_NAME_PATTERN.test(message);

  if (routeFamily(priorRoute) === 'general' && hasPronoun && !explicitlyNamesProfile) {
    return 'general';
  }

  if (standaloneRoute !== 'general') return standaloneRoute;

  if (VAGUE_CONTINUATION_PATTERN.test(message.trim()) && priorRoute) {
    if (routeFamily(priorRoute) === 'profile' && requiresDirectContact(message)) {
      return 'profile-unknown';
    }
    if (isMultiwordWhatAboutTopic(message)) return 'general';
    if (priorRoute === 'profile-unknown') return 'profile-unknown';
    if (['profile', 'general', 'weather'].includes(priorRoute)) return priorRoute;
  }

  return standaloneRoute;
};

const resolveHistoryRoutes = (history) => {
  const userHistory = (Array.isArray(history) ? history : []).filter(
    (item) => item?.role !== 'assistant' && item?.content
  );
  const resolved = [];

  for (const item of userHistory) {
    const priorRoute = resolved.at(-1)?.route || null;
    resolved.push({ item, route: classifyWithPriorRoute(String(item.content), priorRoute) });
  }

  return resolved;
};

export const classifyAssistantQuestion = (message, history = []) => {
  const priorRoute = resolveHistoryRoutes(history).at(-1)?.route || null;
  return classifyWithPriorRoute(String(message || ''), priorRoute);
};

export const selectHistoryForRoute = (history, route) => {
  const resolved = resolveHistoryRoutes(history);
  const selected = [];
  const targetFamily = routeFamily(route);

  for (let index = resolved.length - 1; index >= 0; index -= 1) {
    if (routeFamily(resolved[index].route) !== targetFamily) break;
    selected.unshift(resolved[index].item);
  }

  return selected;
};
