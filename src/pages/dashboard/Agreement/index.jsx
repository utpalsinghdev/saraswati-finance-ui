import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import Modal from "../../../components/ui/modal";
import Input from "../../../components/ui/input";
import ComboBox from "../../../components/ui/comboBox";
import Button from "../../../components/ui/button";
import { FileText, Download, User } from "lucide-react";
import useSiteConfig from "../../../hooks/useSiteConfig";
import moment from "moment";
import TextArea from "../../../components/ui/textarea";

Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    ],
});

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 25,
        fontSize: 10,
        lineHeight: 1.3,
        fontFamily: 'Roboto'
    },
    header: {
        fontSize: 12,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textDecoration: 'underline'
    },
    section: {
        marginBottom: 5
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        marginBottom: 4
    },
    paragraph: {
        marginBottom: 5,
        lineHeight: 1.4,
        fontFamily: 'Roboto'
    },
    bold: {
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    },
    signatureSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    signatureBlock: {
        width: '45%'
    },
    signatureTitle: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        marginBottom: 3
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
    tableCell: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: '#000',
        fontSize: 9,
        fontFamily: 'Roboto'
    },
    tableHeader: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    photoBox: {
        borderWidth: 1,
        borderColor: '#000',
        width: 80,
        height: 120,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoText: {
        fontSize: 9,
        fontFamily: 'Roboto'
    },
    footer: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 9,
        color: 'gray',
        fontFamily: 'Roboto'
    }
});

const AgreementDocument = ({ customerData, grantorName, grantorAddress, config }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>GUARANTEE DEED PROPERTY AGAINST</Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        This guarantee deed is executed on this day of <Text style={styles.bold}>{moment().format("DD-MM-YYYY")} {grantorName} {grantorAddress}</Text> Here in after SE called 1st part (Guarantor) in favour of the <Text style={styles.bold}>{config?.title || "Saraswati Financial Services Private Limited"}, Office Add : - {config?.address?.[0] || "CORPORATE OFFICE : SECTOR – 15D, SHOP NO. 72 & 73, GROUND FLOOR, CHANDIGARH - 160015."}</Text> Here in after called the II
                    </Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        nd part to secure the loan to borrower <Text style={styles.bold}>{customerData?.name || ""} {customerData?.address || ""}</Text> The 1st part shall be liable to the loan amount of <Text style={styles.bold}>Rs.{customerData?.loanInNumber || ""}</Text>/- along with the interest <Text style={styles.bold}>@ {customerData?.interestRate || ""}% P.A.</Text> flat for the period of <Text style={styles.bold}>({customerData?.loanYear || ""} Month / {customerData?.loanYear ? Math.floor(customerData.loanYear / 12) : ""} Year) FILE NO-{customerData?.customerId || ""}, {moment().format("DD-MMM-YYYY")}/ P.L,</Text> Whose <Text style={styles.bold}>E.M.I- Rs. {customerData?.emi || ""}</Text>/- and other expenses in case of default of the borrower on following terms & conditions. That <Text style={styles.bold}>Office Add : - {config?.address?.[0] || "CORPORATE OFFICE : SECTOR – 15D, SHOP NO. 72 & 73, GROUND FLOOR, CHANDIGARH - 160015. Adm. Office CHANDIGARH here in after"}</Text> called IInd part shall be legally entitled to recover the secured loan from the Ist part(Guarantor)through attachment and-auction of sale of the movable and immovable properties of the I st part. In case of non- payment of dues of loan <Text style={styles.bold}>{customerData?.name || ""} {customerData?.address || ""}</Text> (borrower) to the IInd part.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1.</Text>
                    <Text style={styles.paragraph}>
                        That the Ist part will make full & final payment of dues of loan to the IInd part and shall not sale/mortgage transferred/lease out/rent out his movable and immovable properties through any type of deeds or agreement of Sale and through deed of mortgage. And his/her legal wife, sons, daughters and other legal heirs shall also be liable to pay the same as the executants the 1st part is fully and legally bound. That I am the safe and absolute owner of my movable and immovable property and there in no co-owner/partner/share holder/tenants of my property hereby conveyed under this guarantee deed and I have indefeasible and unfettered right to convey the same to the other.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2.</Text>
                    <Text style={styles.paragraph}>
                        That I am the safe and absolute owner of my movable and immovable property and there in no co-owner/partner/share holder/tenants of my property hereby conveyed under this guarantee deed and I have indefeasible and unfettered right to convey the same to the other.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3.</Text>
                    <Text style={styles.paragraph}>
                        That the Ist Part will be bound to disclose all the information related to his/her financial status, previous liabilities of loans dues on him/her, savings, details of assets, movable and immovable properties, previous loan guarantee taken by his/her for any other person and details of income & expenses. And the information related to the income/assets/properties/financial status of Ist part may be given to the Govt. depot. By the IInd part, if necessary. Then the first part will not raise any objection to the IInd part.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4.</Text>
                    <Text style={styles.paragraph}>
                        That the Ist do undertake surety that the II Nd part will have all right to cancel/reject the guarantee/surety of Ist for borrower if the income & Saving or the value of asset is found less than the loan amount and the information served by the Ist Part found wrong/fake/forged.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5.</Text>
                    <Text style={styles.paragraph}>
                        That if the loan secured by the Ist part along with the interest from IInd part is not repaid within the prescribed stipulated period by the borrower that in such a position the executants and his legal heirs shall raise no disputes or objections of any kind what so ever to repayment of dues of procedures adopted by the IInd Part.
                    </Text>
                </View>



                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>Details of Property:</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={styles.photoBox}>
                        <Text style={styles.photoText}>Photo</Text>
                    </View>
                    <View style={styles.photoBox}>
                        <Text style={styles.photoText}>Photo</Text>
                    </View>
                </View>

                <View wrap={false} style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>S.No.</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>Khasra No.</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>Plot No.</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>Area Of Property</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>Khatauni No.</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>Type Of Property</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text></Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text></Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text></Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text></Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text></Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text></Text>
                        </View>
                    </View>
                </View>

                <View style={styles.signatureSection}>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.signatureTitle}>Signature and Thumb</Text>
                        <Text style={styles.signatureTitle}>Impression of Loanee</Text>
                    </View>
                    <View style={styles.signatureBlock}>
                        <Text style={styles.signatureTitle}>Signature and Thumb</Text>
                        <Text style={styles.signatureTitle}>Impression of Guarantor</Text>
                    </View>
                </View>

                <View style={styles.paragraph}>
                    <Text style={{ textAlign: 'right' }}>TO BE VERIFIED BY-</Text>
                </View>

                <View style={styles.paragraph}>
                    <Text style={{ textAlign: 'right' }}>DULY REGISTRES WITH SUB EXECUTANT TEHSILDAR</Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        That the executants and his/her legal heirs shall make full co-operation in the ways recovery of secured loan from <Text style={styles.bold}>{metaData.title || ""}</Text> herein after called the IInd Part. The executants here declared and authorized the IInd part to recover the secured loan from his/her movable aim movable properties/assets and the executants shall raise no objection/hindrances of a kind what so ever of the movable and immovable properties of Ist part are attached auctioned or sold in the public in order to recover the loan with interest by the IInd Part.
                    </Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        The executants called Ist part do hereby declare undertakes that the above-mentioned statements given are true correct and faithful to the fact of my knowledge. I and my legal heirs also undertakes that if any of the information's mentioned above are false, incorrect than the loan applicant <Text style={styles.bold}>{grantorName} {grantorAddress}</Text> Should be treated as cancelled further I and we also under takes that we will furnished all the formalities as per the terms and conditions of The <Text style={styles.bold}>{metaData.title || ""}</Text> 1st part above mentioned do here by <Text style={styles.bold}>........................</Text>
                    </Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        on his behalf and his/her legal heirs of Ist part and with the consent of his legal heirs solemnly affirm and state on that the comment of his deed of guarantee from para No - 1 to para No-8 are true to the fact my knowledge and behalf of my all legal heirs shall bound to carry on the terms and conditions of deed guarantee executed by Ist part and my sole ownership property which is registered through this guarantee deed with the consent of my family is situated at by <Text style={styles.bold}>{customerData?.name || ""} {customerData?.address || ""}</Text> and the details of property are mentioned below.
                    </Text>
                </View>



                <View style={styles.header}>
                    <Text>IRREVOCABLE GENERAL POWER OF ATTORNEY</Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        <Text style={styles.bold}>{grantorName} {grantorAddress}</Text> Proprietor/Partner/ Director/Employee do hereby make constitute and appoint. <Text style={styles.bold}>{metaData.title || "."}</Text> through its proprietor and its legal counsel as my true and lawful attorney in order to clear his dues or otherwise generally for me for all matters or on behalf of all my present and future business establishment joint and several and in my name and on my name and on my behalf in respect of collecting or enforcing payment from my customers etc. and in respect of running all my business establishment joint and several on my behalf independently or safeguard his investments and other dues and collecting or enforcing payments from all other resources / parties as conceivable which / who own me.
                    </Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        Directly / Indirectly or incidentally connected to me in any manner howsoever and collecting or enforcing any rent and money due to me personally or all my business establishment joint and several or my heirs and successors joint and several to receive the payment of any money whatsoever due and payable to me personally or all my business establishment joint and several or my heirs and successors joint and several in respect of the aforesaid and to give proper receipt and discharge the same and to file suits on non-payment thereof any other suit for recover and completion payment there of or of that purpose to signature and verify the plaint to filling, institution and connected to the case for payment in respect of the aforesaid all my business establishment joint and several or in respect of me directly or my other present and future joint and several business establishment or of my heirs and successors joint and several. To take or enforce possession of any joint as several, present and future, immovable and moveable property estate, building, business establishment in my name of heirs and successors joint and several undisputable and irrevocably. To automatically in her it tenancy in my name of heirs and successors or in the name of all my present and future joint and several business establishments or of my heirs and successors joint and irrevocably and indisputably to his discretion.
                    </Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        To sell/ pledge / mortgage / auction all my properties / estate / business establishment, joint and present and future, of my heirs and successors, joint and several execute documents / mortgage deeds in my name and on behalf or in the name and on behalf of my heirs and successors and to retain the proceeds with himself thus obtained and all these right and power or the attorney herein and irrevocable, exclusive absolute and in disputable and shall not be withdrawn for any reason whatsoever of shall remain unaffected due to any Act., mission or variation in the procession and powers contained in the power of attorney. To file take back the documents, to engage advocates. to deposit and receive money or refund vouchers and grant receipts thereof to receive certified copies of the order and to do all such acts and / to things which may be done towards institution, filling and conduct of the above cases and proceedings and in the course of prosecution of the said suit whether in the lower courts or in the appellate courts, and I do hereby confirm and ratify whatsoever the said attorney shall do in matters.
                    </Text>
                </View>



                <View style={styles.paragraph}>
                    <Text>
                        To operate all my joint and individual Bank and Post Office Accounts on my behalf and in my name and in the name on behalf joint my heirs and successors individually and jointly. I do hereby also undertake that all my Power of attorney of this Kind given to any third or other party or such appointment made will be invalid illegal, unconstitutional and Ultra - vires on my part of my heirs and successors thereon herein after and by this stand to commit irrevocable and a binding on me that shall not constitute, make and appoint any other Power of Attorney of this kind on my behalf for me in my name on behalf of my heirs and successors except <Text style={styles.bold}>{metaData.title || ""}</Text> as aforesaid.
                    </Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        This Power of Attorney shall only operate in gas a of default on the part of executants here by in paying the monthly Instalments (as agreed by the executants power of attorney holder) that must be paid by the executants at the rate of <Text style={styles.bold}>{customerData?.interestRate || ""}%</Text> per annum against the loan amount of <Text style={styles.bold}>Rs {customerData?.loanInNumber || ""}/-</Text> from the date of disbursement.
                    </Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>
                        All previous appointments of Power of this kind stand cancelled and invalid. If issued in favour of any third party except any issued in favour of <Text style={styles.bold}>{metaData.title || ""}</Text>. as afore said indisputable. THIS POWER OF ATTORNEY IS IRREVOCABLE IN WITHESS WHEREOF, I HAVE SET MY HANDS ON THIS DATE.
                    </Text>
                </View>

                <View style={styles.paragraph}>
                    <Text>WITNESS: EXECUTANT:</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={[styles.photoBox, { borderColor: '#2D528F' }]}>
                        <Text style={styles.photoText}>GUARANTOR'S PHOTO</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <Text style={styles.paragraph}>DULY REGISTRES WITH SUB EXECUTANT TEHSILDAR</Text>
                    </View>
                </View>

                <View style={styles.paragraph}>
                    <Text>EXECUTANT Photograph Attested by Notary Public/Executive Magistrate</Text>
                </View>



                <View style={styles.header}>
                    <Text>Consent of Guarantor and his family members (Above 18 Years) with their signature</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={[styles.photoBox, { borderColor: '#2D528F', width: 60, height: 60 }]}>
                        <Text style={styles.photoText}>PHOTO</Text>
                    </View>
                    <View style={[styles.photoBox, { borderColor: '#2D528F', width: 60, height: 60 }]}>
                        <Text style={styles.photoText}>PHOTO</Text>
                    </View>
                </View>

                <View style={styles.paragraph}>
                    <Text style={{ textAlign: 'center' }}>NAME OF GUARANTOR                      NAME OF GUANATOR'S WIFE</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={[styles.photoBox, { borderColor: '#2D528F', width: 60, height: 60 }]}>
                        <Text style={styles.photoText}>PHOTO</Text>
                    </View>
                    <View style={[styles.photoBox, { borderColor: '#2D528F', width: 60, height: 60 }]}>
                        <Text style={styles.photoText}>PHOTO</Text>
                    </View>
                </View>

                <View style={styles.paragraph}>
                    <Text style={{ textAlign: 'center' }}>LEGAL HEIRS                              LEGAL HEIRS</Text>
                </View>



                <View style={styles.footer}>
                    <Text>Generated on {new Date().toLocaleDateString()}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default function Agreement() {
    const { config, loading: configLoading } = useSiteConfig();
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [grantorName, setGrantorName] = useState("");
    const [grantorAddress, setGrantorAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await ApiService.fetchData({
                url: 'api/customer',
                method: 'GET',
            });
            setCustomers(response.data.data || []);
        } catch (error) {
            toast.error('Failed to fetch customers');
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateAgreement = () => {
        if (!selectedCustomer || Object.keys(selectedCustomer).length === 0) {
            toast.error('Please select a customer first');
            return;
        }
        if (!grantorName.trim()) {
            toast.error('Please enter grantor name');
            return;
        }
        if (!grantorAddress.trim()) {
            toast.error('Please enter grantor address');
            return;
        }
        setModalOpen(true);
    };

    const handleDownload = () => {
        setModalOpen(false);
        toast.success('Agreement generated successfully');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Generate Guarantee Deed</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Customer <span className="text-red-500">*</span>
                        </label>
                        <ComboBox
                            people={customers.map((customer) => ({
                                id: customer.id,
                                name: `${customer.name}-${customer.customerId || 'N/A'}-(₹${customer.loanInNumber || 'N/A'})`,
                            }))}
                            onChange={(e) => {
                                console.log(e);
                                const customer = customers.find((c) => Number(c.id) === Number(e));
                                setSelectedCustomer(customer || {});
                            }}
                            name={"customerId"}
                            placeholder={"Select Customer"}
                            value={selectedCustomer?.id || ""}
                            icon={<User className="w-4 text-blue-500" />}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Grantor Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            label={""}
                            placeholder="Enter grantor name"
                            value={grantorName}
                            onChange={(e) => setGrantorName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Grantor Address <span className="text-red-500">*</span>
                        </label>
                        <TextArea
                            type="text"
                            label={""}
                            placeholder="Enter grantor address"
                            value={grantorAddress}
                            onChange={(e) => setGrantorAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-end">
                        <Button
                            onClick={handleGenerateAgreement}
                            disabled={!selectedCustomer || Object.keys(selectedCustomer).length === 0 || !grantorName.trim() || !grantorAddress.trim() || downloadLoading}
                            className="w-full"
                        >
                            {downloadLoading ? 'Generating...' : 'Generate Letter'}
                        </Button>
                    </div>
                </div>

                {selectedCustomer && Object.keys(selectedCustomer).length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Selected Customer Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="font-medium">{selectedCustomer.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Address</p>
                                <p className="font-medium">{selectedCustomer.address || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Customer ID</p>
                                <p className="font-medium">{selectedCustomer.customerId || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Loan Amount</p>
                                <p className="font-medium">₹{selectedCustomer.loanInNumber || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Loan Period</p>
                                <p className="font-medium">{selectedCustomer.loanYear || 'N/A'} years</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Guardian</p>
                                <p className="font-medium">
                                    {selectedCustomer.guardian_relation === "SONOF" ? "S/O" :
                                        selectedCustomer.guardian_relation === "DOF" ? "D/O" : "W/O"} {selectedCustomer.guardian_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Phone</p>
                                <p className="font-medium">{selectedCustomer.phone}</p>
                            </div>
                        </div>
                    </div>
                )}

                {(grantorName || grantorAddress) && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-blue-900">Grantor Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {grantorName && (
                                <div>
                                    <p className="text-sm text-blue-700">Grantor Name</p>
                                    <p className="font-medium text-blue-900">{grantorName}</p>
                                </div>
                            )}
                            {grantorAddress && (
                                <div>
                                    <p className="text-sm text-blue-700">Grantor Address</p>
                                    <p className="font-medium text-blue-900">{grantorAddress}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Modal
                open={modalOpen}
                setOpen={setModalOpen}
                title="Download Guarantee Deed"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Click the button below to download the guarantee deed for {selectedCustomer?.name} {selectedCustomer?.address || ''} with grantor {grantorName}.
                    </p>

                    <div className="flex justify-center">
                        <PDFDownloadLink
                            document={<AgreementDocument customerData={selectedCustomer} grantorName={grantorName} grantorAddress={grantorAddress} config={config} />}
                            fileName={`Guarantee-Deed-${selectedCustomer?.name}-${grantorName}-${moment().format('DD-MM-YYYY')}.pdf`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"

                        >
                            {({ blob, url, loading, error }) =>
                                loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Generating PDF...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </div>
                                )
                            }
                        </PDFDownloadLink>
                    </div>
                </div>
            </Modal>
        </div>
    );
} 