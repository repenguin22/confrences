/** library */
import React, { FC, useEffect } from 'react';
import ReactGA from 'react-ga';

/** Custom Components */
import Header from '../header/Header';

/** Material UI Components */
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        maxWidth: '100%',
        marginTop: theme.spacing(2),
    },
    link: {
        margin: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const AboutUs: FC = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'プライバシーポリシーおよびサービス利用規約';
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="xl">
                <div className={classes.root}>
                    <Card className={classes.card}>
                        <CardHeader
                            title="プライバシーポリシー"
                        />
                        <CardContent>
                            <Box textAlign="left" m={1} fontSize={20}>
                                <Typography align="left" color="textPrimary" display="block">プライバシーポリシー（または個人情報保護方針）</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、運営者が取得した個人情報の取扱いに関し、個人情報の保護に関する法律、個人情報保護に関するガイドライン等の指針、その他個人情報保護に関する関係法令を遵守します。</Typography>
                                <Typography align="left" color="textPrimary" display="block">２.個人情報の安全管理</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、個人情報の保護に関して、組織的、物理的、人的、技術的に適切な対策を実施し、運営者の取り扱う個人情報の漏えい、滅失又はき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講ずるものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">３.個人情報の取得等の遵守事項</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者による個人情報の取得、利用、提供については、以下の事項を遵守します。</Typography>
                                <Typography align="left" color="textPrimary" display="block">(1)個人情報の取得</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、運営者が管理するインターネットによる情報提供サイト（以下「本サイト」といいます。）の運営に必要な範囲で、本サイトの一般利用者（以下「ユーザー」といいます。）又は本サイトに広告掲載を行う者（以下「掲載主」といいます。）から、ユーザー又は掲載主に係る個人情報を取得することがあります。</Typography>
                                <Typography align="left" color="textPrimary" display="block">(2)個人情報の利用目的</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、運営者が取得した個人情報について、法令に定める場合又は本人の同意を得た場合を除き、以下に定める利用目的の達成に必要な範囲を超えて利用することはありません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">①　本サイトの運営、維持、管理</Typography>
                                <Typography align="left" color="textPrimary" display="block">②　本サイトを通じたサービスの提供及び紹介</Typography>
                                <Typography align="left" color="textPrimary" display="block">③　本サイトの品質向上のためのアンケート</Typography>
                                <Typography align="left" color="textPrimary" display="block">(3)個人情報の提供等</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、法令で定める場合を除き、本人の同意に基づき取得した個人情報を、本人の事前の同意なく第三者に提供することはありません。なお、本人の求めによる個人情報の開示、訂正、追加若しくは削除又は利用目的の通知については、法令に従いこれを行うとともに、ご意見、ご相談に関して適切に対応します。</Typography>
                                <Typography align="left" color="textPrimary" display="block">4 .個人情報の利用目的の変更</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、前項で特定した利用目的は、予め本人の同意を得た場合を除くほかは、原則として変更しません。但し、変更前の利用目的と相当の関連性を有すると合理的に認められる範囲において、予め変更後の利用目的を公表の上で変更を行う場合はこの限りではありません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">５.個人情報の第三者提供</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、個人情報の取扱いの全部又は一部を第三者に委託する場合、その適格性を十分に審査し、その取扱いを委託された個人情報の安全管理が図られるよう、委託を受けた者に対する必要かつ適切な監督を行うこととします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">６.個人情報の取扱いの改善・見直し</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、個人情報の取扱い、管理体制及び取組みに関する点検を実施し、継続的に改善・見直しを行います。</Typography>
                                <Typography align="left" color="textPrimary" display="block">７.個人情報の廃棄</Typography>
                                <Typography align="left" color="textPrimary" display="block">運営者は、個人情報の利用目的に照らしその必要性が失われたときは、個人情報を消去又は廃棄するものとし、当該消去及び廃棄は、外部流失等の危険を防止するために必要かつ適切な方法により、業務の遂行上必要な限りにおいて行います。</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardHeader
                            title="サービス利用規約"
                        />
                        <CardContent>
                            <Box textAlign="left" m={1} fontSize={20}>
                                <Typography align="left" color="textPrimary" display="block">利用規約</Typography>
                                <Typography align="left" color="textPrimary" display="block">この利用規約（以下，「本規約」といいます。）は，運営者（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第1条（適用）</Typography>
                                <Typography align="left" color="textPrimary" display="block">本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第2条（利用登録）</Typography>
                                <Typography align="left" color="textPrimary" display="block">本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこの承認を登録希望者に通知することによって，利用登録が完了するものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">利用登録の申請に際して虚偽の事項を届け出た場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">本規約に違反したことがある者からの申請である場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">その他，当社が利用登録を相当でないと判断した場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">第3条（ユーザーIDおよびパスワードの管理）</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。当社は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，当社に故意又は重大な過失がある場合を除き，当社は一切の責任を負わないものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第4条（利用料金および支払方法）</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーは，本サービスの有料部分の対価として，当社が別途定め，本ウェブサイトに表示する利用料金を，当社が指定する方法により支払うものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーが利用料金の支払を遅滞した場合には，ユーザーは年14．6％の割合による遅延損害金を支払うものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第5条（禁止事項）</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">法令または公序良俗に違反する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">犯罪行為に関連する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社，本サービスの他のユーザー，または第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社のサービスの運営を妨害するおそれのある行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">他のユーザーに関する個人情報等を収集または蓄積する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">不正アクセスをし，またはこれを試みる行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">他のユーザーに成りすます行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社，本サービスの他のユーザーまたは第三者の知的財産権，肖像権，プライバシー，名誉その他の権利または利益を侵害する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">以下の表現を含み，または含むと当社が判断する内容を本サービス上に投稿し，または送信する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">過度に暴力的な表現</Typography>
                                <Typography align="left" color="textPrimary" display="block">露骨な性的表現</Typography>
                                <Typography align="left" color="textPrimary" display="block">人種，国籍，信条，性別，社会的身分，門地等による差別につながる表現</Typography>
                                <Typography align="left" color="textPrimary" display="block">自殺，自傷行為，薬物乱用を誘引または助長する表現</Typography>
                                <Typography align="left" color="textPrimary" display="block">その他反社会的な内容を含み他人に不快感を与える表現</Typography>
                                <Typography align="left" color="textPrimary" display="block">以下を目的とし，または目的とすると当社が判断する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">営業，宣伝，広告，勧誘，その他営利を目的とする行為（当社の認めたものを除きます。）</Typography>
                                <Typography align="left" color="textPrimary" display="block">性行為やわいせつな行為を目的とする行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">面識のない異性との出会いや交際を目的とする行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社，本サービスの他のユーザー，または第三者に不利益，損害または不快感を与えることを目的とする行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">宗教活動または宗教団体への勧誘行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">その他，当社が不適切と判断する行為</Typography>
                                <Typography align="left" color="textPrimary" display="block">第6条（本サービスの提供の停止等）</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">コンピュータまたは通信回線等が事故により停止した場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">その他，当社が本サービスの提供が困難と判断した場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第7条（著作権）</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーは，自ら著作権等の必要な知的財産権を有するか，または必要な権利者の許諾を得た文章，画像や映像等の情報に関してのみ，本サービスを利用し，投稿ないしアップロードすることができるものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーが本サービスを利用して投稿ないしアップロードした文章，画像，映像等の著作権については，当該ユーザーその他既存の権利者に留保されるものとします。ただし，当社は，本サービスを利用して投稿ないしアップロードされた文章，画像，映像等について，本サービスの改良，品質の向上，または不備の是正等ならびに本サービスの周知宣伝等に必要な範囲で利用できるものとし，ユーザーは，この利用に関して，著作者人格権を行使しないものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">前項本文の定めるものを除き，本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権はすべて当社または当社にその利用を許諾した権利者に帰属し，ユーザーは無断で複製，譲渡，貸与，翻訳，改変，転載，公衆送信（送信可能化を含みます。），伝送，配布，出版，営業使用等をしてはならないものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第8条（利用制限および登録抹消）</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，投稿データを削除し，ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">本規約のいずれかの条項に違反した場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">登録事項に虚偽の事実があることが判明した場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">決済手段として当該ユーザーが届け出たクレジットカードが利用停止となった場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">料金等の支払債務の不履行があった場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社からの連絡に対し，一定期間返答がない場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">本サービスについて，最終の利用から一定期間利用がない場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">その他，当社が本サービスの利用を適当でないと判断した場合</Typography>
                                <Typography align="left" color="textPrimary" display="block">前項各号のいずれかに該当した場合，ユーザーは，当然に当社に対する一切の債務について期限の利益を失い，その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，本条に基づき当社が行った行為によりユーザーに生じた損害について，一切の責任を負いません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第9条（保証の否認および免責事項）</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし，本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">前項ただし書に定める場合であっても，当社は，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当社またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第10条（サービス内容の変更等）</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第11条（利用規約の変更）</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第12条（個人情報の取扱い）</Typography>
                                <Typography align="left" color="textPrimary" display="block">当社は，本サービスの利用によって取得する個人情報については，当社「プライバシーポリシー」に従い適切に取り扱うものとします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第13条（通知または連絡）</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーと当社との間の通知または連絡は，当社の定める方法によって行うものとします。当社は,ユーザーから,当社が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。</Typography>
                                <Typography align="left" color="textPrimary" display="block">第14条（権利義務の譲渡の禁止）</Typography>
                                <Typography align="left" color="textPrimary" display="block">ユーザーは，当社の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </React.Fragment >
    );
}

export default AboutUs;