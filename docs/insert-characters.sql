-- Characters table insert statements
-- 鬼滅の刃 無限城編 キャラクターデータ

-- [鬼] category: 'demon'
INSERT INTO characters (id, name_ja, name_en, category, display_order, description_ja, description_en) VALUES
('demon_1', '黒死牟', 'Kokushibo', 'demon', 1, '上弦の壱。月の呼吸を使う元鬼殺隊剣士。', 'Upper Rank One. Former Demon Slayer who uses Moon Breathing.'),
('demon_2', '猗窩座', 'Akaza', 'demon', 2, '上弦の参。破壊殺と呼ばれる技を繰り出す。', 'Upper Rank Three. Uses techniques called Destructive Death.'),
('demon_3', '童磨', 'Doma', 'demon', 3, '上弦の弐。2枚の扇で氷の攻撃を繰り出す。', 'Upper Rank Two. Attacks with ice using two fans.'),
('demon_4', '鳴女', 'Nakime', 'demon', 4, '上弦の肆。琵琶を使って相手の座標を変える。', 'Upper Rank Four. Changes coordinates using a biwa.'),
('demon_5', '獪岳', 'Kaigaku', 'demon', 5, '上弦の陸。雷の呼吸を使う善逸の兄弟子。', 'Upper Rank Six. Zenitsu''s senior disciple who uses Thunder Breathing.'),
('demon_6', '鬼舞辻無惨', 'Kibutsuji Muzan', 'demon', 6, '鬼の始祖。青い彼岸花を探している。', 'The progenitor of all demons. Searching for the Blue Spider Lily.'),
('demon_7', '愈史郎', 'Yushiro', 'demon', 7, '珠世によって鬼にされた。珠世が好き。', 'Turned into a demon by Tamayo. Loves Tamayo.'),
('demon_8', '珠世', 'Tamayo', 'demon', 8, '無惨の支配から外れた鬼。無惨を人に戻す薬を作る。', 'A demon freed from Muzan''s control. Creates medicine to turn Muzan human.'),
('demon_9', '胡蝶家を襲った鬼', 'Demon who attacked Kocho family', 'demon', 9, '醜い鬼。悲鳴嶼行冥に倒される。', 'An ugly demon. Defeated by Himejima Gyomei.');

-- [柱] category: 'corps' (Hashira)
INSERT INTO characters (id, name_ja, name_en, category, display_order, description_ja, description_en) VALUES
('corps_1', '悲鳴嶼行冥', 'Himejima Gyomei', 'corps', 10, '岩柱。鬼殺隊随一の戦闘能力を持つ。', 'Stone Hashira. Has the strongest combat abilities in the Demon Slayer Corps.'),
('corps_2', '伊黒小芭内', 'Iguro Obanai', 'corps', 11, '蛇柱。甘露寺のことが好き。', 'Serpent Hashira. Has feelings for Kanroji.'),
('corps_3', '不死川実弥', 'Shinazugawa Sanemi', 'corps', 12, '風柱。実は人情深い人物。', 'Wind Hashira. Actually a deeply compassionate person.'),
('corps_4', '冨岡義勇', 'Tomioka Giyu', 'corps', 13, '水柱。朴念仁で炭治郎の兄弟子。', 'Water Hashira. Stoic and Tanjiro''s senior disciple.'),
('corps_5', '甘露寺蜜璃', 'Kanroji Mitsuri', 'corps', 14, '恋柱。キュンキュンすることが好き。', 'Love Hashira. Loves things that make her heart flutter.'),
('corps_6', '時透無一郎', 'Tokito Muichiro', 'corps', 15, '霞柱。剣技の才があり最年少で柱となった。', 'Mist Hashira. Talented swordsman who became the youngest Hashira.'),
('corps_7', '胡蝶しのぶ', 'Kocho Shinobu', 'corps', 16, '蟲柱。鬼の首を切れないが殺せる毒を作った。', 'Insect Hashira. Can''t behead demons but created poison that can kill them.'),
('corps_8', '煉獄杏寿郎', 'Rengoku Kyojuro', 'corps', 17, '炎柱。無限列車編にて殉職したが炭治郎に影響を与えた人。', 'Flame Hashira. Died in the Mugen Train Arc but greatly influenced Tanjiro.'),
('corps_9', '宇髄天元', 'Uzui Tengen', 'corps', 18, '音柱。遊郭編で重症を負い柱を引退し、産屋敷家の護衛に就く。', 'Sound Hashira. Retired after severe injuries in the Entertainment District Arc, now guards the Ubuyashiki family.'),
('corps_10', '胡蝶カナエ', 'Kocho Kanae', 'corps', 19, '元花柱。しのぶの姉で童磨と対峙し殉職した。', 'Former Flower Hashira. Shinobu''s sister who died fighting Doma.'),
('corps_11', '桑島慈悟郎', 'Kuwajima Jigoro', 'corps', 20, '元柱。獪岳と善逸の育手で、獪岳の鬼化をきっかけに切腹。', 'Former Hashira. Trainer of Kaigaku and Zenitsu, committed seppuku after Kaigaku became a demon.'),
('corps_12', '鱗滝左近次', 'Urokodaki Sakonji', 'corps', 21, '元柱。義勇と炭治郎の育手で、禰豆子を匿う。', 'Former Hashira. Trainer of Giyu and Tanjiro, sheltered Nezuko.'),
('corps_13', '煉獄槇寿郎', 'Rengoku Shinjuro', 'corps', 22, '元柱。煉獄杏寿郎の父。酒に溺れている。', 'Former Hashira. Kyojuro''s father. Drowning in alcohol.');

-- [一般隊士] category: 'corps' (Regular Demon Slayers)
INSERT INTO characters (id, name_ja, name_en, category, display_order, description_ja, description_en) VALUES
('corps_14', '竈門炭治郎', 'Kamado Tanjiro', 'corps', 23, '水の呼吸とヒノカミ神楽を使う。禰豆子の兄。', 'Uses Water Breathing and Hinokami Kagura. Nezuko''s brother.'),
('corps_15', '嘴平伊之助', 'Hashibira Inosuke', 'corps', 24, '獣の呼吸を使う。猪突猛進な性格。', 'Uses Beast Breathing. Has a reckless personality.'),
('corps_16', '我妻善逸', 'Agatsuma Zenitsu', 'corps', 25, '雷の呼吸を使う。壱の型しか使えない。', 'Uses Thunder Breathing. Can only use the First Form.'),
('corps_17', '竈門禰豆子', 'Kamado Nezuko', 'corps', 26, '炭治郎の妹。鬼にされたが陽の光を克服した。', 'Tanjiro''s sister. Turned into a demon but conquered sunlight.'),
('corps_18', '栗花落カナヲ', 'Tsuyuri Kanao', 'corps', 27, '花の呼吸を使う。しのぶの継子。', 'Uses Flower Breathing. Shinobu''s Tsuguko.'),
('corps_19', '不死川玄弥', 'Shinazugawa Genya', 'corps', 28, '呼吸が使えず銃で戦う。実弥の弟。', 'Can''t use Breathing techniques, fights with guns. Sanemi''s brother.'),
('corps_20', '村田', 'Murata', 'corps', 29, '水の呼吸を使う。だが水のエフェクトは見えない。', 'Uses Water Breathing. But the water effects aren''t visible.'),
('corps_21', 'モブたち', 'Mob Demon Slayers', 'corps', 30, '柱稽古で出てきた隊士たち。', 'Demon Slayers who appeared during Hashira Training.'),
('corps_22', 'しのぶの継子たち3人', 'Shinobu''s Three Tsuguko', 'corps', 31, '鬼に殺された。', 'Killed by demons.'),
('corps_23', '神崎アオイたち', 'Kanzaki Aoi and others', 'corps', 32, '鬼に家族を殺され、蝶屋敷で生活している。', 'Had their families killed by demons, living at the Butterfly Mansion.');

-- [非隊士] category: 'civilian' (Non-Corps Members)
INSERT INTO characters (id, name_ja, name_en, category, display_order, description_ja, description_en) VALUES
('civilian_1', '狛治', 'Hakuji', 'civilian', 33, '素流の門下生。父が自殺し、恋雪とその父も毒殺された。', 'Soryu disciple. His father committed suicide, and Koyuki and her father were poisoned.'),
('civilian_2', '恋雪', 'Koyuki', 'civilian', 34, '病弱な娘。狛治と夫婦になる契りを交したが毒殺される。', 'Sickly daughter. Exchanged marriage vows with Hakuji but was poisoned.'),
('civilian_3', '慶蔵（素流師範）', 'Keizo (Soryu Master)', 'civilian', 35, '狛治を罪人の道から救った人物。明朗快活。', 'Saved Hakuji from the path of crime. Cheerful and lively.'),
('civilian_4', '剣術道場', 'Kenjutsu Dojo', 'civilian', 36, '恋雪と師範を毒殺したことで狛治に皆殺しにされる。', 'Massacred by Hakuji for poisoning Koyuki and the master.'),
('civilian_5', '奉行所の人', 'Magistrate Officials', 'civilian', 37, '盗みを働く狛治に鞭打ちの刑を与えた。', 'Gave Hakuji flogging punishment for theft.'),
('civilian_6', '狛治の父', 'Hakuji''s Father', 'civilian', 38, '病弱。狛治がまた盗みを働いたことを知り自殺。', 'Sickly. Committed suicide after learning Hakuji stole again.'),
('civilian_7', '産屋敷家の兄弟', 'Ubuyashiki Siblings', 'civilian', 39, '無限城の階層図を手がけ、隊士たちの統率をとる。', 'Created the Infinity Castle map and coordinated the Demon Slayers.'),
('civilian_8', '鎹鴉（愈史郎血気術）', 'Kasugai Crow (Yushiro''s Blood Art)', 'civilian', 40, '愈史郎の血鬼術を用いて隊士たちに情報伝達を行う。', 'Uses Yushiro''s Blood Demon Art to relay information to Demon Slayers.'),
('civilian_9', '鎹鴉（炭治郎）', 'Kasugai Crow (Tanjiro''s)', 'civilian', 41, '強気な性格。炭治郎に情報伝達を行っている。', 'Strong-willed personality. Relays information to Tanjiro.'),
('civilian_10', '鎹鴉（義勇）', 'Kasugai Crow (Giyu''s)', 'civilian', 42, 'ヨボヨボのおじいちゃん。義勇の身を案じている。', 'Elderly crow. Worries about Giyu''s well-being.'),
('civilian_11', '童磨の父', 'Doma''s Father', 'civilian', 43, '万世極楽教を開く。息子である童磨に教祖をやらせる。', 'Founded the Eternal Paradise Faith. Made his son Doma the leader.'),
('civilian_12', '童磨の母', 'Doma''s Mother', 'civilian', 44, '父と同じ。絶望的に頭が悪い。', 'Same as the father. Hopelessly stupid.'),
('civilian_13', '万世極楽教の信者', 'Eternal Paradise Faith Believers', 'civilian', 45, '極楽があると信じ童磨に縋る人々。', 'People who believe in paradise and cling to Doma.'),
('civilian_14', '童磨に食べられていた子', 'Child Being Eaten by Doma', 'civilian', 46, '万世極楽教徒。救いを求め童磨に縋る。', 'Eternal Paradise Faith follower. Sought salvation from Doma.'),
('civilian_15', '胡蝶の母', 'Kocho Mother', 'civilian', 47, 'しのぶとカナエの母。鬼に殺されるが優れた人。', 'Shinobu and Kanae''s mother. Killed by demons but was an excellent person.'),
('civilian_16', '胡蝶の父', 'Kocho Father', 'civilian', 48, '母と同じ。', 'Same as the mother.');