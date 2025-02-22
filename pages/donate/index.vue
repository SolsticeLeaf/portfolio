<script setup lang="ts">
import currencies from "~/config/currencies.config";
import config from "~/config/initial.config";
const { locale, getLocaleMessage } = useI18n()

useHead({title: getLocaleMessage(locale.value)["donate_title"] + " | " + config.siteName});

const isIOS = computed(() => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
});

function getDefaultCurrency(list: any) {
  let defaultCurrency = list[0];
  if (locale.value === "ru") {
    defaultCurrency = list.filter((item: any) => { return item.name === "RUB" })[0];
  }
  return defaultCurrency;
};

const defaultCurrency = getDefaultCurrency(currencies)
const amount = ref(defaultCurrency.default)
const currency = ref(defaultCurrency)

const changeAmount = () => {
  amount.value = currency.value.default
}

const checkAmount = () => {
  if (amount.value < currency.value.default) {
    amount.value = currency.value.default
  }
}
const pay = async () => {
  try {
    if (amount.value <= 0) {
      amount.value = 1;
    }
    const { success: response_success, payment_url: response_url } = await $fetch('/api/createPayment', {
      default: () => [],
      cache: "no-cache",
      server: false,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locale: locale.value,
        amount: amount.value,
        order_id: `order-${Date.now()}`,
        currency: currency.value.name
      })
    });
    if (response_success && response_url) {
      const url = response_url + `?lang=${locale.value}`;
      window.location.assign(url);
      window.open(url);
    } else {
      alert('Ошибка: не удалось получить ссылку на оплату');
    }

  } catch (error) {
    console.error('Ошибка:', error);
    alert('Ошибка при отправке запроса');
  }
}

const buttonColor = ref('');
const updateColors = () => {
  if (document.body) {
    buttonColor.value = getComputedStyle(document.body).getPropertyValue('--donate-button-color').trim();
  }
};

onMounted(() => {
  updateColors();
  const observer = new MutationObserver(() => {
    updateColors();
  });
  observer.observe(document.body, { attributes: true});
  onBeforeUnmount(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <div class="card">
        <div class="card__top">
          <nuxt-img class="card__top__image" src="https://ik.imagekit.io/kiinse/coffee_cup?updatedAt=1738662246231"/>
        </div>
        <div class="blur__glass">
          <div class="card__title">
            {{ $t('donate_title') }}
          </div>
          <div class="card__main">
            <UInput required
                    color="primary"
                    name="amount"
                    v-model="amount"
                    variant="none"
                    class="card__main__input"
                    type="number"
                    @change="checkAmount"
                    :ui="{ rounded: 'rounded-full'}"
                    :placeholder="$t('donate_amount')"
            >
              <template #leading>
                {{ currency.symbol }}
              </template>
            </UInput>
            /
            <select class="transparent__glass__sky card__main__select" v-model="currency" @change="changeAmount">
              <option v-for="curr in currencies" :value="curr">
                {{curr.name + " " + curr.symbol}}
              </option>
            </select>
          </div>
          <div class="card__bottom">
            <el-button class="card__bottom__button" :color="buttonColor" @click="pay" round>
              <icons icon="fa-solid fa-dollar-sign" class="card__bottom__button__text icon_padding_right" />
              <p class="card__bottom__button__text">{{ $t('donate_send') }}</p>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'assets/scss/screens' as *;

.wrapper {
  @media screen and (max-width: $screen-sm) {
    padding: 1rem;
  }
}

.donate-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
}

.card {
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding-bottom: 3rem;

    &__image {
      border-radius: 10rem;
      max-width: 10rem;
      max-height: fit-content;
    }
  }

  &__title {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    color: var(--text-color-primary)
  }

  &__main {
    display: flex;
    column-gap: 1rem;
    padding-top: 0.8rem;
    padding-bottom: 1.4rem;
    justify-content: center;
    align-items: center;
    -webkit-align-items: center;

    &__input {
      border: 1px solid var(--donate-select) !important;
      border-radius: 10rem;

      @media screen and (max-width: $screen-sm) {
        height: 3rem;
        display: flex;
        justify-content: center;
        justify-items: center;
      }
    }

    &__select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 3rem;
      padding: 5px;
      text-align: center;
      width: 4rem;
      min-width: fit-content;
      background: transparent;
      font-size: 0.8rem;
      word-spacing: -0.4rem;
      height: 2.3rem;
      border: 1px solid var(--donate-select) !important;

      @media screen and (max-width: $screen-sm) {
        height: 3rem;
      }
    }
  }

  &__bottom {
    display: flex;
    width: 100%;
    justify-content: center;
    justify-items: center;

    &__button {
      width: 60%;
      height: 2.5rem;

      &__text {
        font-size: 1rem;
        color: var(--donate-button-text);
      }

      @media screen and (max-width: $screen-sm) {
        height: 3rem;
        width: fit-content;
      }
    }
  }
}

</style>