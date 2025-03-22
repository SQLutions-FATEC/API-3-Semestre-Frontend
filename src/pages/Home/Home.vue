<script>
import { Select } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import company from '@/services/company';

export default {
  name: 'Home',

  components: {
    Select,
  },

  setup() {
    const selectedCompany = ref('');

    const getCompanies = async () => {
      try {
        await company.get();
      } catch (error) {
        console.error(error);
      }
    };

    const handleChange = (event) => {
      const companyId = event.target.value;

      router.push({
        path: '/company',
        query: { company_id: companyId },
      });
    };

    onMounted(async () => {
      await getCompanies();
    });

    return {
      getCompanies,
      handleChange,
      selectedCompany,
    };
  },
};
</script>

<template>
  <a-select
    v-model:value="selectedCompany"
    placeholder="Empresas"
    style="width: 120px"
    @change="handleChange"
  >
    <a-select-option value="jack">Jack</a-select-option>
    <a-select-option value="lucy">Lucy</a-select-option>
    <a-select-option value="disabled" disabled>Disabled</a-select-option>
    <a-select-option value="Yiminghe">yiminghe</a-select-option>
  </a-select>
</template>
