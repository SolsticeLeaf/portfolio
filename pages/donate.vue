<script setup lang="ts">
import currencies from "~/config/currencies.config";
const { locale } = useI18n()

const amount = ref(currencies[0].default)
const currency = ref(currencies[0])

const changeAmount = () => {
  amount.value = currency.value.default
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
      window.open(response_url + `?lang=${locale.value}`, '_blank');
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
                    v-model="amount"
                    variant="outline"
                    type="number"
                    :ui="{ rounded: 'rounded-full' }"
                    :placeholder="$t('donate_amount')"
            >
              <template #leading>
                {{ currency.symbol }}
              </template>
            </UInput>
            /
            <UInputMenu
                v-model="currency"
                :options="currencies"
                :placeholder="$t('donate_amount')"
                :popper="{ arrow: true }"
                by="id"
                option-attribute="name"
                class="w-20"
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
                     block
                     variant="soft"
                     @click="pay"
                     :ui="{ rounded: 'rounded-full' }"
                     class="card__bottom__button"
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
  }

  &__bottom {

    &__button {
      display: flex;
      justify-content: center;
    }

  }
}

</style>