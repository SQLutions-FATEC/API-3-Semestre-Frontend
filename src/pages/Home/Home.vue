<script>
import { Select } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import company from '@/services/company';

export default {
  name: 'Home',

  components: {
    'a-select': Select,
  },

  setup() {
    const router = useRouter();
    const companies = ref([]);
    const selectedCompany = ref(null);

    const getCompanies = async () => {
      try {
        const { data } = await company.get();
        companies.value = data.map((company) => ({
          label: company.company_name,
          value: company.id,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const handleChange = (value) => {
      const companyId = value;

      router.push({
        name: 'Company',
        params: { id: String(companyId) },
      });
    };

    onMounted(async () => {
      await getCompanies();
    });

    return {
      companies,
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
    :options="companies"
    @change="handleChange"
  />
</template>
