<script setup>

/* page */

definePageMeta({
  name: 'authentication',
  layout: 'empty',
});

useHead({
  title: 'Login',
});


/* auth */

const mode = ref('login');
const captchaId = ref('');
const captchaText = ref('');


/* login */

const email = ref('');

async function doLogin() {

  const data = await ufetch(`/authentication/login`, {
    method: 'post',
    body: {
      method: 'email',
      email: email.value,
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value,
    },
    silent: true,
    onResponseError: async ({ response }) => {

      captchaText.value = '';

      if (response?.status === 404) {

        toastError({
          title: `This account does not exist: ${email.value}`,
        });

        directRegister.value = false;
        mode.value = 'register';

      }
      else {
        toastError({
          title: 'There was a problem. Please try again.'
        });
      }

    },
  });


  if (data.needsVerification) {
    verificationToken.value = data.verificationToken;
    mode.value = 'verify';
  }
  else {
    await submitLoadUser(data.token);
  }

}


/* register */

const directRegister = ref(false);

async function doRegister() {

  const data = await ufetch(`/authentication/register`, {
    method: 'post',
    body: {
      method: 'email',
      email: email.value,
    },
    headers: {
      'captcha-id': captchaId.value,
      'captcha-text': captchaText.value,
    },
  });


  if (data.needsVerification) {
    verificationToken.value = data.verificationToken;
    mode.value = 'verify';
  }
  else {
    await submitLoadUser(data.token);
  }

}


/* verification */

const verificationToken = ref('');
const verificationCode = ref('');

async function submitVerification() {

  const data = await ufetch(`/authentication/verify`, {
    method: 'post',
    body: {
      verificationToken: verificationToken.value,
      verificationCode: verificationCode.value,
    },
    onResponseError: () => {
      mode.value = 'login';
      verificationCode.value = '';
    },
  });


  await submitLoadUser(data.token);

}


/* profile */

async function submitLoadUser(loginToken) {
  try {
    await authenticationLoadUserWithToken(loginToken, useToken(), useUser());
    navigateTo({ name: 'general.home' })
  }
  catch (error) {

    console.error(error);

    mode.value = 'login';
    email.value = '';
    captchaId.value = '';
    captchaText.value = '';
    verificationCode.value = '';

  }
}

</script>


<template>
  <div class="min-h-screen flex items-center justify-center p-3">

    <u-card title="Login | Register" title-classes="text-center" class="w-full max-w-md">

      <template v-if="mode === 'login'">

        <p class="my-4">
          If you already have an account, please enter your email below and click on "Login". <br />
          If you don't have an account, please click on "Register".
        </p>

        <u-input
          label="Email"
          class="block"
          inputmode="email"
          v-model="email"
        />

        <captcha-input
          :key="mode"
          class="mt-2"
          v-model:captcha-id="captchaId"
          v-model:captcha-text="captchaText"
        />

        <div class="flex flex-col gap-2 mt-4">
          <u-btn
            label="Login"
            :click-handler="doLogin"
          />
          <u-btn
            label="Register"
            class="soft"
            @click="directRegister = true; mode = 'register';"
          />
        </div>

      </template>

      <template v-if="mode === 'register'">

        <p v-if="!directRegister" class="my-4">
          There is no account with this email <strong>"{{ email }}"</strong>, if you want to create a new account, please enter the captcha below and click on "Create new account".
        </p>
        <p v-else class="my-4">
          Please enter your email below, enter the captcha and click on "Create new account".
        </p>

        <u-input
          v-if="directRegister"
          label="Email"
          inputmode="email"
          v-model="email"
        />

        <captcha-input
          :key="mode"
          class="mt-2"
          v-model:captcha-id="captchaId"
          v-model:captcha-text="captchaText"
        />

        <div class="flex flex-col gap-2 mt-4">
          <u-btn
            label="Create new account"
            :click-handler="doRegister"
          />
        </div>

      </template>

      <template v-if="mode === 'verify'">

        <p class="my-4">
          Please enter the code sent to you at <strong>"{{ email }}"</strong> below and click on "Verify".
        </p>

        <u-input
          label="Verification code"
          class="block"
          inputmode="numeric"
          v-model="verificationCode"
        />

        <div class="flex flex-col gap-2 mt-4">
          <u-btn
            label="Verify"
            :click-handler="submitVerification"
          />
        </div>

      </template>

    </u-card>

  </div>
</template>