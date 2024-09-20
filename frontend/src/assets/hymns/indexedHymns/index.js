import ten_thino from './01-0_ten_thino.json';
import resurrection_tennav from './02-0_resurrection_tennav.json';
import first_hoos from './03-0_first_hoos.json';
import lobsh_of_first_hoos from './04-0_lobsh_of_first_hoos.json';
import second_hoos from './05-0_second_hoos.json';
import second_lobsh from './06-0_second_lobsh.json';
import third_hoos from './07-0_third_hoos.json';
import arepsalin from './08-0_arepsalin.json';
import ten_oweeh_enthok from './09-0_ten_oweeh_enthok.json';
import comemoration from './10-0_comemoration.json';
import doxology_st_mary from './11-0_doxology_st_mary.json';
import doxology_archangel_michael from './12-0_doxology_archangel_michael.json';
import doxology_st_anthony from './13-0_doxology_st_anthony.json';
import conclusion_of_doxologies from './14-0_conclusion_of_doxologies.json';
import fourth_hoos from './15-0_fourth_hoos.json';
import aynahti from './16-0_aynahti.json';
import aykoti from './17-0_aykoti.json';
import theotoky_adam_intro from './18-0_theotoky_adam_intro.json';
import theotoky_part_1 from './19-0_theotoky_part_1.json';
import theotoky_part_2 from './20-0_theotoky_part_2.json';
import theotoky_part_3 from './21-0_theotoky_part_3.json';
import theotoky_part_4 from './22-0_theotoky_part_4.json';
import theotoky_part_5 from './23-0_theotoky_part_5.json';
import theotoky_part_6 from './24-0_theotoky_part_6.json';
import gospel from './24-1_gospel.json';
import shere_ne_maria from './25-0_shere_ne_maria.json';
import semouti from './26-0_semouti.json';
import seven_times from './27-0_seven_times.json';
import theotoky_part_10 from './28-0_theotoky_part_10.json';
import theotoky_part_11 from './29-0_theotoky_part_11.json';
import theotoky_part_12 from './30-0_theotoky_part_12.json';
import theotoky_part_13 from './31-0_theotoky_part_13.json';
import theotoky_part_14 from './32-0_theotoky_part_14.json';
import theotoky_part_15 from './33-0_theotoky_part_15.json';
import theotoky_part_16 from './34-0_theotoky_part_16.json';
import theotoky_part_17 from './35-0_theotoky_part_17.json';
import theotoky_part_18 from './36-0_theotoky_part_18.json';
import your_mercies from './37-0_your_mercies.json';
import creed_intro from './38-0_creed_intro.json';
import creed from './39-0_creed.json';
import amen_keryalison from './40-0_amen_keryalison.json';

import occasions from '../occasions/index';

import { CopticFeasts } from '../util';



const hymns = (date = new Date().toISOString()) => {
    const copticFeasts = new CopticFeasts(new Date(date));
    const occasionName = copticFeasts.feast.name
    const isOccasion = !!occasionName;
    return [
        ten_thino,
        resurrection_tennav,
        first_hoos,
        lobsh_of_first_hoos,
        second_hoos,
        second_lobsh,
        third_hoos,
        arepsalin,
        ten_oweeh_enthok,
        comemoration,
        ...(isOccasion ? [occasions[occasionName].doxology] : []),
        doxology_st_mary,
        doxology_archangel_michael,
        doxology_st_anthony,
        conclusion_of_doxologies,
        fourth_hoos,
        isOccasion ? occasions[occasionName].pasli_adam : aynahti,
        aykoti,
        theotoky_adam_intro,
        theotoky_part_1,
        theotoky_part_2,
        theotoky_part_3,
        theotoky_part_4,
        theotoky_part_5,
        theotoky_part_6,
        gospel,
        shere_ne_maria,
        semouti,
        seven_times,
        theotoky_part_10,
        theotoky_part_11,
        theotoky_part_12,
        theotoky_part_13,
        theotoky_part_14,
        theotoky_part_15,
        theotoky_part_16,
        theotoky_part_17,
        theotoky_part_18,
        your_mercies,
        creed_intro,
        creed,
        amen_keryalison
    ]
}

export default hymns;