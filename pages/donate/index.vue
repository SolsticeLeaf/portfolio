<script setup lang="ts">
import currencies from '~/config/currencies.config';
import config from '~/config/initial.config';
import FlexButton from "~/components/utilities/FlexButton.vue";
import ActionButton from "~/components/utilities/ActionButton.vue";
const { locale, getLocaleMessage } = useI18n()

onMounted(() => {
  useHead({
    title: getLocaleMessage(locale.value)["donate_title"] + " | " + config.siteName
  });
})

function getDefaultCurrency(list: any) {
  let defaultCurrency = list[0];
  if (locale.value === "ru") {
    defaultCurrency = list.filter((item: any) => { return item.name === "RUB" })[0];
  }
  return defaultCurrency;
}

const defaultCurrency = getDefaultCurrency(currencies)

const amount = computed(() => {
  return (document.getElementById("donateInput") as HTMLInputElement) ;
});

const currency = ref(defaultCurrency)

const changeAmount = () => {
  amount.value.value = currency.value.default
}
const checkAmount = () => {
  if (amount.value.value < currency.value.default) {
    amount.value.value = currency.value.default
  }
}
const pay = async () => {
  try {
    if (amount.value.value <= "0") {
      amount.value.value = "1";
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
        amount: amount.value.value,
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
  nextTick(() => {
    checkAmount();
  });
});
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <div class="card">
        <div class="card__top">
          <Icon class="card__top__image" name="line-md:coffee-loop"/>
        </div>
        <div class="blur__glass">
          <h6 class="card__title">
            {{ $t('donate_title') }}
          </h6>
          <div class="card__main">
            <input
                type="number"
                id="donateInput"
                name="amount"
                class="card__main__input"
                @change="checkAmount"
                :placeholder="$t('donate_amount')"
                required
                size="10" />
            <p>/</p>
            <select class="transparent__glass__sky card__main__select" v-model="currency" @change="changeAmount">
              <option v-for="curr in currencies" :value="curr">
                {{curr.name + " " + curr.symbol}}
              </option>
            </select>
          </div>
          <div class="card__bottom">
            <ActionButton :text="$t('donate_send')"
                        :text-bold="true"
                        text-color="--donate-button-text"
                        icon="mdi:dollar"
                        color="#50C878"
                        :customColor="false"
                        :click="pay"
                        class="card__bottom__button"
                        :outline="false" />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'assets/scss/screens' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;

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
      font-size: 10rem;
      color: #ff9100;
    }
  }

  &__title {
    width: 100%;
    text-align: center;
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
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 3rem;
      width: 4rem;
      min-width: fit-content;
      background: transparent;
      height: 2rem;
      padding: 0.5rem;
      border: 1px solid var(--donate-select) !important;
      color: var(--text-color-primary) !important;

      @media screen and (max-width: $screen-sm) {
        height: 3rem;
      }
    }

    &__select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 3rem;
      text-align: center;
      width: 4rem;
      min-width: fit-content;
      background: transparent;
      height: 3.3rem;
      padding: 0.5rem;
      border: 1px solid var(--donate-select) !important;
      color: var(--text-color-primary) !important;

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
      width: fit-content;
      height: 2.5rem;

      @media screen and (max-width: $screen-sm) {
        height: 3rem;
        width: fit-content;
      }
    }
  }
}

</style>
