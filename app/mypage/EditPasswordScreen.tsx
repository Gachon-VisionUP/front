import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useIcon } from '@/context/IconContext';
import backIcon from '@/assets/images/main/back.png';
import logo from '@/assets/images/login/Logo.png';
import eyeIcon from '@/assets/images/login/eye.png';
import eyeOffIcon from '@/assets/images/login/noeye.png';
import SuccessModal from "../../components/mypage/SuccessModal";

export default function EditPasswordScreen() {
    const { icon } = useIcon();
    const router = useRouter(); // Use the router hook
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const handlePasswordChange = () => {
        if (password !== confirmPassword) {
            setErrorMessage('올바른 정보를 입력해주세요.');
            return;
        }
        setErrorMessage('');
        setSuccessModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/mypage')}>
                    <Image source={backIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={logo} resizeMode="contain" style={styles.imageStyle} />
                </View>
            </View>

            {/* Profile Icon and Name */}
            <View style={styles.profileSection}>
                <Image source={icon} style={styles.profileIcon} />
                <Text style={styles.userName}>박나영님</Text>
            </View>

            {/* Password Inputs */}
            <View style={styles.passwordSection}>
                <Text style={styles.label}>새 비밀번호</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="새로운 비밀번호를 입력해주세요."
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setErrorMessage('');
                        }}
                    />
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Image source={passwordVisible ? eyeIcon : eyeOffIcon} style={styles.eyeIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="비밀번호를 다시 입력해주세요."
                        secureTextEntry={!confirmPasswordVisible}
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            setErrorMessage('');
                        }}
                    />
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                        <Image source={confirmPasswordVisible ? eyeIcon : eyeOffIcon} style={styles.eyeIcon} />
                    </TouchableOpacity>
                </View>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                style={[
                    styles.submitButton,
                    !(password && confirmPassword) && styles.disabledButton,
                ]}
                onPress={handlePasswordChange}
                disabled={!password || !confirmPassword}
            >
                <Text style={styles.submitButtonText}>비밀번호 변경하기</Text>
            </TouchableOpacity>

            {/* Success Modal */}
            <SuccessModal
                visible={isSuccessModalVisible}
                onClose={() => setSuccessModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        paddingVertical: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    logo: {
        width: 100,
        height: 30,
        resizeMode: 'contain',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    passwordSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#F9F9F9',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 14,
    },
    eyeButton: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    eyeIcon: {
        width: 19,
        height: 16,
        resizeMode: 'contain',
        marginVertical: 2,
    },
    errorText: {
        color: '#FF0000',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
    submitButton: {
        height: 45,
        backgroundColor: '#488EF6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
    submitButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    imageStyle: {
        width: 170,
        height: 70,
    },
    logoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});