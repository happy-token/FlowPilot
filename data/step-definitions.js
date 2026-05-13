(function attachStepDefinitions(root, factory) {
  root.MultiPageStepDefinitions = factory();
})(typeof self !== 'undefined' ? self : globalThis, function createStepDefinitionsModule() {
  const DEFAULT_ACTIVE_FLOW_ID = 'openai';
  const PLUS_PAYMENT_METHOD_PAYPAL = 'paypal';
  const PLUS_PAYMENT_METHOD_GOPAY = 'gopay';
  const PLUS_PAYMENT_METHOD_GPC_HELPER = 'gpc-helper';
  const PLUS_PAYMENT_STEP_KEY = 'paypal-approve';
  const SIGNUP_METHOD_EMAIL = 'email';
  const SIGNUP_METHOD_PHONE = 'phone';
  const STEP_KIND_REAL = 'real';
  const STEP_KIND_VIRTUAL = 'virtual';
  const DISPLAY_PHONE_VERIFICATION_STEP_KEY = 'phone-verification';
  const DISPLAY_PHONE_VERIFICATION_TITLE = '\u624b\u673a\u53f7\u9a8c\u8bc1';
  const DISPLAY_PHONE_VERIFICATION_BEFORE_STEP_KEY = 'confirm-oauth';

  const NORMAL_STEP_DEFINITIONS = [
    { id: 1, order: 10, key: 'open-chatgpt', title: '打开 ChatGPT 官网' },
    { id: 2, order: 20, key: 'submit-signup-email', title: '注册并输入邮箱' },
    { id: 3, order: 30, key: 'fill-password', title: '填写密码并继续' },
    { id: 4, order: 40, key: 'fetch-signup-code', title: '获取注册验证码' },
    { id: 5, order: 50, key: 'fill-profile', title: '填写姓名和生日' },
    { id: 6, order: 60, key: 'wait-registration-success', title: '等待注册成功' },
    { id: 7, order: 70, key: 'oauth-login', title: '刷新 OAuth 并登录' },
    { id: 8, order: 80, key: 'fetch-login-code', title: '获取登录验证码' },
    { id: 9, order: 90, key: 'confirm-oauth', title: '自动确认 OAuth' },
    { id: 10, order: 100, key: 'platform-verify', title: '平台回调验证' },
  ];

  const PLUS_PAYPAL_STEP_DEFINITIONS = [
    { id: 1, order: 10, key: 'open-chatgpt', title: '打开 ChatGPT 官网' },
    { id: 2, order: 20, key: 'submit-signup-email', title: '注册并输入邮箱' },
    { id: 3, order: 30, key: 'fill-password', title: '填写密码并继续' },
    { id: 4, order: 40, key: 'fetch-signup-code', title: '获取注册验证码' },
    { id: 5, order: 50, key: 'fill-profile', title: '填写姓名和生日' },
    { id: 6, order: 60, key: 'plus-checkout-create', title: '创建 Plus Checkout' },
    { id: 7, order: 70, key: 'plus-checkout-billing', title: '填写账单并提交订单' },
    { id: 8, order: 80, key: 'paypal-approve', title: 'PayPal 登录与授权' },
    { id: 9, order: 90, key: 'plus-checkout-return', title: '订阅回跳确认' },
    { id: 10, order: 100, key: 'oauth-login', title: '刷新 OAuth 并登录' },
    { id: 11, order: 110, key: 'fetch-login-code', title: '获取登录验证码' },
    { id: 12, order: 120, key: 'confirm-oauth', title: '自动确认 OAuth' },
    { id: 13, order: 130, key: 'platform-verify', title: '平台回调验证' },
  ];

  const PLUS_GOPAY_STEP_DEFINITIONS = [
    { id: 1, order: 10, key: 'open-chatgpt', title: '打开 ChatGPT 官网' },
    { id: 2, order: 20, key: 'submit-signup-email', title: '注册并输入邮箱' },
    { id: 3, order: 30, key: 'fill-password', title: '填写密码并继续' },
    { id: 4, order: 40, key: 'fetch-signup-code', title: '获取注册验证码' },
    { id: 5, order: 50, key: 'fill-profile', title: '填写姓名和生日' },
    { id: 6, order: 60, key: 'plus-checkout-create', title: '打开 GoPay 订阅页' },
    { id: 7, order: 70, key: 'gopay-subscription-confirm', title: '等待 GoPay 订阅确认' },
    { id: 10, order: 100, key: 'oauth-login', title: '刷新 OAuth 并登录' },
    { id: 11, order: 110, key: 'fetch-login-code', title: '获取登录验证码' },
    { id: 12, order: 120, key: 'confirm-oauth', title: '自动确认 OAuth' },
    { id: 13, order: 130, key: 'platform-verify', title: '平台回调验证' },
  ];

  const PLUS_GPC_STEP_DEFINITIONS = [
    { id: 1, order: 10, key: 'open-chatgpt', title: '打开 ChatGPT 官网' },
    { id: 2, order: 20, key: 'submit-signup-email', title: '注册并输入邮箱' },
    { id: 3, order: 30, key: 'fill-password', title: '填写密码并继续' },
    { id: 4, order: 40, key: 'fetch-signup-code', title: '获取注册验证码' },
    { id: 5, order: 50, key: 'fill-profile', title: '填写姓名和生日' },
    { id: 6, order: 60, key: 'plus-checkout-create', title: '创建 GPC 订单' },
    { id: 7, order: 70, key: 'plus-checkout-billing', title: '等待 GPC 任务完成' },
    { id: 10, order: 100, key: 'oauth-login', title: '刷新 OAuth 并登录' },
    { id: 11, order: 110, key: 'fetch-login-code', title: '获取登录验证码' },
    { id: 12, order: 120, key: 'confirm-oauth', title: '自动确认 OAuth' },
    { id: 13, order: 130, key: 'platform-verify', title: '平台回调验证' },
  ];

  const PHONE_SIGNUP_TITLE_OVERRIDES = Object.freeze({
    'submit-signup-email': '注册并输入手机号',
    'fetch-signup-code': '获取手机验证码',
  });

  function isPlusModeEnabled(options = {}) {
    return Boolean(options?.plusModeEnabled || options?.plusMode);
  }

  function normalizePlusPaymentMethod(value = '') {
    const normalized = String(value || '').trim().toLowerCase();
    if (normalized === PLUS_PAYMENT_METHOD_GPC_HELPER) {
      return PLUS_PAYMENT_METHOD_GPC_HELPER;
    }
    return normalized === PLUS_PAYMENT_METHOD_GOPAY ? PLUS_PAYMENT_METHOD_GOPAY : PLUS_PAYMENT_METHOD_PAYPAL;
  }

  function normalizeSignupMethod(value = '') {
    return String(value || '').trim().toLowerCase() === SIGNUP_METHOD_PHONE
      ? SIGNUP_METHOD_PHONE
      : SIGNUP_METHOD_EMAIL;
  }

  function normalizeActiveFlowId(value = '', fallback = DEFAULT_ACTIVE_FLOW_ID) {
    const normalized = String(value || '').trim().toLowerCase();
    if (normalized) {
      return normalized;
    }
    const fallbackValue = String(fallback || '').trim().toLowerCase();
    return fallbackValue || DEFAULT_ACTIVE_FLOW_ID;
  }

  function getResolvedSignupMethod(options = {}) {
    return normalizeSignupMethod(options?.resolvedSignupMethod || options?.signupMethod);
  }

  function getOpenAiModeStepDefinitions(options = {}) {
    if (!isPlusModeEnabled(options)) {
      return NORMAL_STEP_DEFINITIONS;
    }
    const paymentMethod = normalizePlusPaymentMethod(options?.plusPaymentMethod || options?.paymentMethod);
    if (paymentMethod === PLUS_PAYMENT_METHOD_GPC_HELPER) {
      return PLUS_GPC_STEP_DEFINITIONS;
    }
    return paymentMethod === PLUS_PAYMENT_METHOD_GOPAY ? PLUS_GOPAY_STEP_DEFINITIONS : PLUS_PAYPAL_STEP_DEFINITIONS;
  }

  function getOpenAiPlusPaymentStepTitle(options = {}) {
    if (!isPlusModeEnabled(options)) {
      return '';
    }
    const paymentStep = getOpenAiModeStepDefinitions({
      ...options,
      plusModeEnabled: true,
    }).find((step) => step.key === PLUS_PAYMENT_STEP_KEY);
    return paymentStep?.title || '';
  }

  function getOpenAiResolvedStepTitle(step = {}, options = {}) {
    if (isPlusModeEnabled(options) && step.key === PLUS_PAYMENT_STEP_KEY) {
      return getOpenAiPlusPaymentStepTitle(options) || step.title;
    }
    const signupMethod = getResolvedSignupMethod(options);
    if (signupMethod === SIGNUP_METHOD_PHONE && PHONE_SIGNUP_TITLE_OVERRIDES[step.key]) {
      return PHONE_SIGNUP_TITLE_OVERRIDES[step.key];
    }
    return step.title;
  }

  function shouldShowOpenAiPhoneVerificationStep(options = {}) {
    return normalizeActiveFlowId(options?.activeFlowId, DEFAULT_ACTIVE_FLOW_ID) === DEFAULT_ACTIVE_FLOW_ID
      && Boolean(options?.phoneVerificationEnabled)
      && getResolvedSignupMethod(options) === SIGNUP_METHOD_EMAIL;
  }

  const OPENAI_RESOLVED_STEP_RULES = Object.freeze([
    Object.freeze({
      key: DISPLAY_PHONE_VERIFICATION_STEP_KEY,
      title: DISPLAY_PHONE_VERIFICATION_TITLE,
      insertBeforeStepKey: DISPLAY_PHONE_VERIFICATION_BEFORE_STEP_KEY,
      skippable: true,
      visibleWhen: shouldShowOpenAiPhoneVerificationStep,
    }),
  ]);

  const FLOW_DEFINITION_BUILDERS = Object.freeze({
    openai: {
      getAllSteps() {
        const keyed = new Map();
        for (const step of [
          ...NORMAL_STEP_DEFINITIONS,
          ...PLUS_PAYPAL_STEP_DEFINITIONS,
          ...PLUS_GOPAY_STEP_DEFINITIONS,
          ...PLUS_GPC_STEP_DEFINITIONS,
        ]) {
          keyed.set(`${step.id}:${step.key}`, step);
        }
        return Array.from(keyed.values()).sort((left, right) => {
          const leftOrder = Number.isFinite(left.order) ? left.order : left.id;
          const rightOrder = Number.isFinite(right.order) ? right.order : right.id;
          if (leftOrder !== rightOrder) return leftOrder - rightOrder;
          return left.id - right.id;
        });
      },
      getModeStepDefinitions: getOpenAiModeStepDefinitions,
      getPlusPaymentStepTitle: getOpenAiPlusPaymentStepTitle,
      resolveStepTitle: getOpenAiResolvedStepTitle,
      resolvedStepRules: OPENAI_RESOLVED_STEP_RULES,
      shouldShowPhoneVerificationStep: shouldShowOpenAiPhoneVerificationStep,
    },
  });

  function hasFlow(flowId) {
    const normalizedFlowId = normalizeActiveFlowId(flowId, '');
    return Boolean(normalizedFlowId && FLOW_DEFINITION_BUILDERS[normalizedFlowId]);
  }

  function getRegisteredFlowIds() {
    return Object.keys(FLOW_DEFINITION_BUILDERS);
  }

  function getFlowDefinitionBuilder(options = {}) {
    const flowId = normalizeActiveFlowId(options?.activeFlowId, DEFAULT_ACTIVE_FLOW_ID);
    return {
      flowId,
      builder: FLOW_DEFINITION_BUILDERS[flowId] || null,
    };
  }

  function cloneSteps(steps = [], options = {}, flowId = DEFAULT_ACTIVE_FLOW_ID) {
    const { builder } = getFlowDefinitionBuilder({ activeFlowId: flowId });
    return steps.map((step) => ({
      ...step,
      flowId,
      title: builder?.resolveStepTitle ? builder.resolveStepTitle(step, options) : step.title,
    }));
  }

  function sortSteps(steps = []) {
    return steps.slice().sort((left, right) => {
      const leftOrder = Number.isFinite(left?.order) ? left.order : left?.id;
      const rightOrder = Number.isFinite(right?.order) ? right.order : right?.id;
      if (leftOrder !== rightOrder) return leftOrder - rightOrder;
      return Number(left?.id || 0) - Number(right?.id || 0);
    });
  }

  function getPreviousExecutableStepId(previousStep = null) {
    const executableStepId = Number(previousStep?.executableStepId);
    if (Number.isFinite(executableStepId) && executableStepId > 0) {
      return executableStepId;
    }
    const inheritedExecutableStepId = Number(previousStep?.previousExecutableStepId);
    if (Number.isFinite(inheritedExecutableStepId) && inheritedExecutableStepId > 0) {
      return inheritedExecutableStepId;
    }
    return 0;
  }

  function createResolvedRealStep(step = {}, options = {}) {
    const stepId = Number(step?.id);
    const previousStep = options?.previousStep || null;
    const displayStepId = options?.displayStepId ?? step?.id;
    const displayOrder = Number.isFinite(options?.displayOrder)
      ? options.displayOrder
      : (Number.isFinite(step?.order) ? step.order : stepId);
    return {
      ...step,
      flowId: options?.flowId || step?.flowId || DEFAULT_ACTIVE_FLOW_ID,
      kind: STEP_KIND_REAL,
      type: STEP_KIND_REAL,
      visible: true,
      executable: true,
      displayOnly: false,
      displayOrder,
      displayStepId,
      stepId: Number.isFinite(stepId) ? stepId : null,
      executableStepId: Number.isFinite(stepId) ? stepId : '',
      statusSource: 'step',
      statusKey: String(step?.key || ''),
      previousStepKey: previousStep ? String(previousStep?.key || '') : '',
      previousExecutableStepId: getPreviousExecutableStepId(previousStep),
      skippable: Number.isFinite(stepId) && stepId > 0,
    };
  }

  function createResolvedVirtualStep(rule = {}, options = {}) {
    const previousStep = options?.previousStep || null;
    const baseStepId = Number(options?.baseStepId);
    const displayStepId = options?.displayStepId ?? '';
    const displayOrder = Number.isFinite(options?.displayOrder)
      ? options.displayOrder
      : displayStepId;
    return {
      flowId: options?.flowId || DEFAULT_ACTIVE_FLOW_ID,
      id: `${Number.isFinite(baseStepId) ? baseStepId : 'virtual'}:${String(rule?.key || 'virtual')}`,
      key: String(rule?.key || ''),
      title: String(rule?.title || ''),
      kind: STEP_KIND_VIRTUAL,
      type: STEP_KIND_VIRTUAL,
      visible: true,
      executable: false,
      displayOnly: true,
      displayOrder,
      displayStepId,
      stepId: null,
      executableStepId: '',
      statusSource: 'display-step',
      statusKey: String(rule?.key || ''),
      insertBeforeStepKey: String(rule?.insertBeforeStepKey || ''),
      previousStepKey: previousStep ? String(previousStep?.key || '') : '',
      previousExecutableStepId: getPreviousExecutableStepId(previousStep),
      skippable: rule?.skippable !== false,
    };
  }

  function resolveSteps(steps = [], options = {}) {
    const { flowId, builder } = getFlowDefinitionBuilder(options);
    const baseSteps = cloneSteps(sortSteps(Array.isArray(steps) ? steps : []), options, flowId);
    const resolvedRules = Array.isArray(builder?.resolvedStepRules)
      ? builder.resolvedStepRules.filter((rule) => (
        rule
        && String(rule?.key || '').trim()
        && String(rule?.insertBeforeStepKey || '').trim()
        && (typeof rule.visibleWhen !== 'function' || rule.visibleWhen(options))
      ))
      : [];

    const resolvedSteps = [];
    const insertedRuleKeys = new Set();
    let displayOffset = 0;

    baseSteps.forEach((step) => {
      const stepId = Number(step?.id);
      const stepKey = String(step?.key || '');
      const matchingRules = resolvedRules.filter((rule) => (
        !insertedRuleKeys.has(rule.key)
        && String(rule.insertBeforeStepKey || '') === stepKey
      ));

      matchingRules.forEach((rule) => {
        const previousStep = resolvedSteps[resolvedSteps.length - 1] || null;
        const displayStepId = Number.isFinite(stepId) ? stepId + displayOffset : (resolvedSteps.length + 1);
        resolvedSteps.push(createResolvedVirtualStep(rule, {
          flowId,
          previousStep,
          baseStepId: stepId,
          displayStepId,
          displayOrder: resolvedSteps.length + 1,
        }));
        insertedRuleKeys.add(rule.key);
        displayOffset += 1;
      });

      const previousStep = resolvedSteps[resolvedSteps.length - 1] || null;
      const displayStepId = Number.isFinite(stepId) ? stepId + displayOffset : (resolvedSteps.length + 1);
      resolvedSteps.push(createResolvedRealStep(step, {
        flowId,
        previousStep,
        displayStepId,
        displayOrder: resolvedSteps.length + 1,
      }));
    });

    return resolvedSteps;
  }

  function getSteps(options = {}) {
    const { flowId, builder } = getFlowDefinitionBuilder(options);
    if (!builder?.getModeStepDefinitions) {
      return [];
    }
    return cloneSteps(builder.getModeStepDefinitions(options), options, flowId);
  }

  function getAllSteps(options = {}) {
    const { flowId, builder } = getFlowDefinitionBuilder(options);
    if (!builder?.getAllSteps) {
      return [];
    }
    return cloneSteps(builder.getAllSteps(options), options, flowId);
  }

  function getResolvedSteps(options = {}) {
    return resolveSteps(getSteps(options), options);
  }

  function shouldShowPhoneVerificationStep(options = {}) {
    const { builder } = getFlowDefinitionBuilder(options);
    if (typeof builder?.shouldShowPhoneVerificationStep === 'function') {
      return Boolean(builder.shouldShowPhoneVerificationStep(options));
    }
    return false;
  }

  function getPlusPaymentStepTitle(options = {}) {
    const { builder } = getFlowDefinitionBuilder(options);
    if (!builder?.getPlusPaymentStepTitle) {
      return '';
    }
    return builder.getPlusPaymentStepTitle(options);
  }

  function getStepIds(options = {}) {
    return getSteps(options)
      .map((step) => Number(step.id))
      .filter(Number.isFinite)
      .sort((left, right) => left - right);
  }

  function getLastStepId(options = {}) {
    const ids = getStepIds(options);
    return ids[ids.length - 1] || 0;
  }

  function getStepById(id, options = {}) {
    const numericId = Number(id);
    const { flowId, builder } = getFlowDefinitionBuilder(options);
    if (!builder?.getModeStepDefinitions) {
      return null;
    }
    const match = builder.getModeStepDefinitions(options).find((step) => step.id === numericId);
    return match ? cloneSteps([match], options, flowId)[0] : null;
  }

  return {
    DEFAULT_ACTIVE_FLOW_ID,
    STEP_DEFINITIONS: NORMAL_STEP_DEFINITIONS,
    NORMAL_STEP_DEFINITIONS,
    PLUS_STEP_DEFINITIONS: PLUS_PAYPAL_STEP_DEFINITIONS,
    PLUS_PAYPAL_STEP_DEFINITIONS,
    PLUS_GOPAY_STEP_DEFINITIONS,
    PLUS_GPC_STEP_DEFINITIONS,
    SIGNUP_METHOD_EMAIL,
    SIGNUP_METHOD_PHONE,
    getAllSteps,
    getLastStepId,
    getPlusPaymentStepTitle,
    getResolvedSteps,
    getRegisteredFlowIds,
    getStepById,
    getStepIds,
    getSteps,
    hasFlow,
    isPlusModeEnabled,
    normalizeActiveFlowId,
    normalizePlusPaymentMethod,
    normalizeSignupMethod,
    resolveSteps,
    shouldShowPhoneVerificationStep,
  };
});
