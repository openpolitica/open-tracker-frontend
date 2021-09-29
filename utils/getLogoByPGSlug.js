import accionPopularLogo from 'public/images/gp-logos/accion-popular.png';
import alianzaPorElProgresoLogo from 'public/images/gp-logos/alianza-por-el-progreso.png';
import avanzaPaisLogo from 'public/images/gp-logos/avanza-pais.png';
import fuerzaPopularLogo from 'public/images/gp-logos/fuerza-popular.png';
import juntosPorElPeruLogo from 'public/images/gp-logos/juntos-por-el-peru.png';
import partidoMoradoLogo from 'public/images/gp-logos/partido-morado.png';
import peruLibreLogo from 'public/images/gp-logos/peru-libre.png';
import podemosPeruLogo from 'public/images/gp-logos/podemos-peru.png';
import renovacionPopularLogo from 'public/images/gp-logos/renovacion-popular.png';
import defaultLogo from 'public/images/gp-logos/default-logo.png';

const logoByGPSlug = {
  'accion-popular': accionPopularLogo,
  'alianza-para-el-progreso': alianzaPorElProgresoLogo,
  'avanza-pais': avanzaPaisLogo,
  'fuerza-popular': fuerzaPopularLogo,
  'juntos-por-el-peru': juntosPorElPeruLogo,
  'peru-libre': peruLibreLogo,
  'podemos-peru': podemosPeruLogo,
  'renovacion-popular': renovacionPopularLogo,
  'partido-morado': partidoMoradoLogo,
  'somos-peru': defaultLogo,
  'somos-peru---partido-morado': defaultLogo,
  'no-agrupado': defaultLogo,
};

export const getLogoByPGSlug = slug =>
  logoByGPSlug[slug]?.src ?? defaultLogo.src;
