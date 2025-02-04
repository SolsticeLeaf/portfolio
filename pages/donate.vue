<script setup lang="ts">
import currencies from "~/config/currencies.config";
const { locale } = useI18n()


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
                    v-model="amount"
                    variant="outline"
                    type="number"
                    @change="checkAmount"
                    :ui="{ rounded: 'rounded-full' }"
                    :placeholder="$t('donate_amount')"
            >
              <template #leading>
                {{ currency.symbol }}
              </template>
            </UInput>
            /
            <select class="card__main__select" v-if="isIOS" v-model="currency">
              <option v-for="curr in currencies" :value="curr">
                {{curr.name + " " + curr.symbol}}
              </option>
            </select>
            <UInputMenu
                v-else
                color="primary"
                v-model="currency"
                :options="currencies"
                :placeholder="$t('donate_amount')"
                :popper="{ arrow: true }"
                by="id"
                option-attribute="name"
                @change="changeAmount"
                :ui="{ rounded: 'rounded-full' }"
                :search-attributes="['name', 'symbol']"
            >
              <template #option="{ option: currency }">
                <span class="truncate">{{ currency.symbol }}</span>
                <span class="truncate">{{ currency.name }}</span>
              </template>
            </UInputMenu>
          </div>
          <div class="card__bottom">
            <UButton color="primary"
                     variant="solid"
                     block
                     @click="pay"
                     :ui="{ rounded: 'rounded-full' }"
                     class="p-4"
            >
              <UIcon name="i-heroicons-banknotes-20-solid" class="w-5 h-5" />
              {{ $t('donate_send') }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables.scss' as *;

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
    display: grid;
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
  }

  &__main {
    display: flex;
    column-gap: 1rem;
    padding-top: 0.8rem;
    padding-bottom: 1.4rem;
    justify-content: center;
    align-items: center;
    -webkit-align-items: center;

    &__select {
      border-radius: 3rem;
      padding: 5px;
      width: fit-content;
      background: transparent;
      border: 1px solid #62baf3;
      font-size: 0.9rem;
      word-spacing: -0.4rem;
    }
  }
}

</style>